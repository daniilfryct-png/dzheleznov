const CDEK_API = "https://api.cdek.ru/v2";

export async function getCdekToken() {
  const body = new URLSearchParams();

  body.append("grant_type", "client_credentials");
  body.append("client_id", process.env.CDEK_CLIENT_ID!);
  body.append("client_secret", process.env.CDEK_CLIENT_SECRET!);

  const response = await fetch(
    `${CDEK_API}/oauth/token`,
    {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const data = await response.json();

  if (!data.access_token) {
    throw new Error(
      `CDEK auth failed: ${JSON.stringify(data)}`
    );
  }

  return data.access_token;
}

export async function createCdekOrder(order: {
  id: string;
  name: string;
  phone: string;
  pickupPoint: string | null;
}) {
  const token = await getCdekToken();

  const response = await fetch(
    `${CDEK_API}/orders`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number: order.id,

        tariff_code: 136,

        shipment_point: "ELT2",

        delivery_point: order.pickupPoint!,

        recipient: {
          name: order.name,
          phones: [
            {
              number: order.phone,
            },
          ],
        },

        packages: [
          {
            number: order.id,

            weight: 1000,
            length: 40,
            width: 30,
            height: 10,

            items: [
              {
                name: "D.ZHELEZNOV",
                ware_key: "product",
                cost: 5999,
                weight: 1000,
                amount: 1,
                payment: {
                  value: 0,
                },
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  console.log(
    "CDEK ORDER RESPONSE:",
    JSON.stringify(data, null, 2)
  );

  return data;
}
export async function getCdekOrder(uuid: string) {
  const token = await getCdekToken();

  const response = await fetch(
    `${CDEK_API}/orders/${uuid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}