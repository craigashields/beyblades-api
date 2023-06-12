import axios from 'axios';
import { load} from 'cheerio';
import 'dotenv/config';
import { Prisma, PrismaClient } from '@prisma/client'
import slugify from 'slugify';

const prisma = new PrismaClient()
const BEYBLADE_BASE_URL = 'https://beyblade.fandom.com';

type productInfo = {
    type: string[],
    spinDirection: string[],
    system: string[],
    series: string[],
}

const getBeyblades = async (pages: string[]) => {
    console.log(`🏁 Begin getting a list of all Beyblades`)
    const pageInfoPromises = pages.map((page) => getPageBeyblades(page));
    const pageList: string[] = (await Promise.all(pageInfoPromises)).flat();
    console.log(`✅ Completed list retrieval`);
    return pageList;
}

const getPageBeyblades = async (page: string): Promise<any> => {
    console.log(`Retrieving all Beyblades for page ${page}`)
    const { data } = await axios.get(`${BEYBLADE_BASE_URL}/wiki/Category:Beyblades?from=${page}`);
    const $ = load(data);
    let names: string[] = [];
    $('.category-page__members-for-char li').each((index, element) => {
      const name = $(element).find('a.category-page__member-link').text();
      /*
      checking if the actual name of the Beyblade begins with the page letter. This is because some of the fandom
      pages have linked pages beginning with category or something else. We want to ignore these.
      Also need to exclude anything where the locale (ISO2) is included, as these are just duplicated pages in the locale language.
      */
      if(name.charAt(0).toLowerCase() === page.toLowerCase()){
        const href = $(element).find('a.category-page__member-link').attr('href');
        if (href && isLocaleVersion(href) === false) {
            names.push(href)
        }
      }
    });

    return names;
}


const loadBeyblades = async (beyblades: string[]): Promise<void> => {
    try {
        console.log(`߷ Begin Getting All Beyblade Information`)
        const beybladeInfoPromises = beyblades.map((beyblade) => {
            try {
                return getBeybladeInfo(beyblade);
            } catch (error) {
                console.error(error)
                return null;
            }
        })
        const beybladeInfo = (await Promise.all(beybladeInfoPromises)).filter(Boolean) as Prisma.bey_beybladesCreateInput[];

        // save them to the db
        console.log(`💾 Begin seeding to the database`);
        await prisma.bey_beyblades.createMany({ data: beybladeInfo });
        console.log(`Finished!!!`)
    } catch (error) {
        console.error(error)
    } finally {
        await prisma.$disconnect()
      }
};

const getBeybladeInfo = async (beyblade: string): Promise<Prisma.bey_beybladesCreateInput> => {
    const fandomUrl: string = `${BEYBLADE_BASE_URL}${beyblade}`
    const { data } = await axios.get(`${fandomUrl}`);
    const $ = load(data);

    // get basic information relating to Name, Image and href
    let name_section: string = $('h2[data-source="Name"]').text();
    let name_header: string = $('.page-header__title > span').text();
    let name: string = name_section ? name_section : name_header
    let reference: string = slugify(name.replace("-","_"), {
        lower: true,
        trim: true,
        remove: /[/*+~.()'"!:@<>{}#%|^-]/g,
        replacement: "_"
    });
    // if(isValidUrlString(reference) === false) {
    //     throw new Error(`${reference} is not a valid string for URL`); // Throw an error to skip this record
    // }
    let imageUrl = $('.image.image-thumbnail > img').attr('src');
    if (!name) {
        throw new Error('Name not available'); // Throw an error to skip this record
    }

    // get product information
    const sections = $('section')
    let sectionsInformation: Record<string, any> = {};

    if(sections){

        $(sections).find('h2.pi-header').each((index, element) => {
            const category = toCamelCase($(element).text())

            sectionsInformation[category] = {};

            $(element).nextAll('.pi-data').each((i, el) => {
                const field: string = toCamelCase($(el).find('h3.pi-data-label').text());
                const valueElement = $(el).find('.pi-data-value');
              
                let value: string[];
                const anchors = valueElement.find('a');
                if (anchors.length > 0) {
                    value = anchors.map((j, anchor) => $(anchor).text()).get();
                } else {
                    value = [valueElement.text().trim()];
                }

                sectionsInformation[category][field] = value;
            });
    })}

const { type, spinDirection, system, series } = sectionsInformation.productInformation || [];

const assignedProductInfo: productInfo = {
  type: type || [],
  spinDirection: spinDirection || [],
  system: system || [],
  series: series || []
};

const parts:object = sectionsInformation.parts ? sectionsInformation.parts : {}

    const beybladeInfo: Prisma.bey_beybladesCreateInput = {
        name,
        reference,
        imageUrl,
        fandomUrl,
        productInfo: assignedProductInfo,
        parts
    };
    return beybladeInfo;
};

function isValidUrlString(str: string): boolean {
    const validRegex = /^[a-z0-9_]+$/;
    return validRegex.test(str);
  }

function isLocaleVersion(str: string): boolean {
    
    const regex: RegExp = /\/([a-z]{2})$/i;
    
    const matches = str.match(regex);
    if (matches && matches.length > 1) {
      return true
    } else {
      return false
    }
}

function toCamelCase(str: string): string {
    const removedSpecialChars = str.replace(/[^a-zA-Z0-9 ]/g, '');
    return removedSpecialChars.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match: string, index: number) => {
      if (+match === 0) return ''; // ignore 0s
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });  }

const pages = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

getBeyblades(pages).then(data =>{
    loadBeyblades(data)
});