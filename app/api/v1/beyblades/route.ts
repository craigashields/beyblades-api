import { bey_beyblades } from '@prisma/client'
import {NextResponse} from 'next/server'
import { prisma } from '../../../../utils/prisma'

type ErrorResponse = {
    err: string
}

type QueryConfig = {
    take?: number,
    skip?: number,
    select?: object
}

export async function GET(req: Request, res: NextResponse<bey_beyblades[] | ErrorResponse>) {
    try {
        const {searchParams, href, search} = new URL(req.url)
        const limit: string | null = searchParams.get('limit');
        const limitStr: string = Array.isArray(limit) ? limit[0] : limit;

        const offset: string | null = searchParams.get('offset');
        const offsetStr: string = Array.isArray(offset) ? offset[0] : offset;
        const queryConfig: QueryConfig = {};

        if (limitStr) {
            const limitInt: number = parseInt(limitStr);
            if (isNaN(limitInt)) {
              return new NextResponse(JSON.stringify({
                err: "Please enter a valid number for the limit parameter"
              }), {
                status: 400,
                statusText: "Bad Request",
                headers: {
                  'Content-Type': 'application/json',
                }
              })
              
            }
            queryConfig.take = limitInt;
        }

        if (offsetStr) {
            const offsetInt: number = parseInt(offsetStr);
            if (isNaN(offsetInt)) {
              return new NextResponse(JSON.stringify({
                err: "Please enter a valid number for the offset parameter"
              }), {
                status: 400,
                statusText: "Bad Request",
                headers: {
                  'Content-Type': 'application/json',
                }
              })
            }
            queryConfig.skip = offsetInt;
        }

        queryConfig.select = {
            id: true,
            name: true
        }
        const beyBladesAll = await prisma.bey_beyblades.findMany(queryConfig)
        const beybladeBaseUrl: string = href.replace(search,""); 
        const response = beyBladesAll.map(item => addUrlField(item,beybladeBaseUrl));

        // add url to each object. 
        return NextResponse.json(response, {
            status: 200,
          })
    } catch (err) {
        console.error(err);
        NextResponse.json({
          err: "Internal Server Error. Please try again later. "
        }, {
            status: 500,
          })
    }

}

type Beyblade = {
  id: number;
  reference: string;
  name: string;
  url?: string;
}

function addUrlField(beyblade: Beyblade, baseUrl: string): Beyblade {
  const url = `${baseUrl}/${beyblade.id}`;
  return { ...beyblade, url };
}
