const response = await fetch(
  "https://api.cdek.ru/v2/deliverypoints?code=MSK103",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
