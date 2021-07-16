import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if (request.method === 'POST') {
        const TOKEN = '6d1f0f64974439d4c442e57fa53fec'
        const client = new SiteClient(TOKEN);


        const registroCriado = await client.items.create({
            itemType: "971923", // ID do Model de "Communities" criado pelo Dato
            ...request.body,
        })
        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }
    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}
