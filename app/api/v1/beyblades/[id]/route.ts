import { bey_beyblades } from '@prisma/client'
import {NextResponse} from 'next/server'
import { prisma } from '../../../../../utils/prisma'

export const dynamic = 'force-dynamic'

type ErrorResponse = {
    err: string
}

type Props = {
    params: {
        id: string
    }
}

type QueryConfig = {
    idInt?: number
}

export async function GET(req: Request, { params: { id } }: Props, res: NextResponse<bey_beyblades[] | ErrorResponse>) {
    try {

        let queryConfig: QueryConfig = {}
        
        if (id) {
            const idInt: number = parseInt(id);
            if (isNaN(idInt)) {
                return new NextResponse(JSON.stringify({
                    err: "Please enter a valid Id"
                  }), {
                    status: 400,
                    statusText: "Bad Request",
                    headers: {
                      'Content-Type': 'application/json',
                    }
                  })
            }
            queryConfig.idInt = idInt
        }

        const beyBladesById = await prisma.bey_beyblades.findUnique({
            where: {
                id: queryConfig.idInt
            }
        }) || {}

        // add url to each object. 
        return new NextResponse(JSON.stringify(beyBladesById), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            }
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
