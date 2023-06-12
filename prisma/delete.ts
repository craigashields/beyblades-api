import 'dotenv/config';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const deleteBeyRecords = async () => {
    try {
        
        console.log(`🏁  Begin table cleardown`)
        const deleteBeys = await prisma.bey_beyblades.deleteMany({})
        console.log(`✔️  Table cleardown complete`)

        await prisma.$queryRaw`ALTER TABLE bey_beyblades AUTO_INCREMENT = 1`
        console.log(`1️⃣  reset bey_beyblades auto increment to 1`)
        
    } catch (error) {
        console.error(error)
    } finally {
        await prisma.$disconnect()
      }
};

deleteBeyRecords();