const CDEK_API = "https://api.cdek.ru/v2";

export async function getCdekToken() {
  console.log("CLIENT ID:", process.env.CDEK_CLIENT_ID);
  console.log("CLIENT SECRET EXISTS:", !!process.env.CDEK_CLIENT_SECRET);
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

  console.log("CDEK AUTH RESPONSE:", JSON.stringify(data, null, 2));

  if (!data.access_token) {
  throw new Error(`CDEK auth failed: ${JSON.stringify(data)}`);
  }

  return data.access_token;
  }
export async function createCdekOrder() {
  const token = await getCdekToken();

  const response = await fetch(`${CDEK_API}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      number: `DZ-${Date.now()}`,

      tariff_code: 136,

      shipment_point: "ELT2",

      delivery_point: "MSK103",

      recipient: {
        name: "Тестовый клиент",
        phones: [
          {
            number: "+79999999999",
          },
        ],
      },

      packages: [
        {
          number: `PKG-${Date.now()}`,
          weight: 1000,
          length: 40,
          width: 30,
          height: 10,

          items: [
            {
              name: "REMIND hoodie",
              ware_key: "remind-hoodie",
              cost: 5999,
              weight: 1000,
              amount: 1,
              payment: {
                value: 0,
              },
            },
          ],
        },
      ]
    }),
  });

  const data = await response.json();

  console.log(
    "CDEK ORDER RESPONSE:",
    JSON.stringify(data, null, 2)
  );

  return data;
}