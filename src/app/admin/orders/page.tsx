import { prisma } from "@/lib/prisma";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ password?: string }>;
}) {
  const params = await searchParams;

  if (params.password !== process.env.ADMIN_PASSWORD) {
    return (
      <main className="max-w-md mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">
          Доступ запрещён
        </h1>

        <p>Неверный пароль.</p>
      </main>
    );
  }

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: true,
    },
  });

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        Заказы ({orders.length})
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-300 p-6 rounded"
          >
            <div className="mb-4">
              <h2 className="font-bold text-lg">
                {order.id}
              </h2>

              <p>
                Статус:{" "}
                <span
                  className={
                    order.paymentStatus === "paid"
                      ? "text-green-600 font-bold"
                      : "text-yellow-600 font-bold"
                  }
                >
                  {order.paymentStatus}
                </span>
              </p>
              <p>Сумма: {order.amount} ₽</p>

              <p>Имя: {order.name}</p>
              <p>Телефон: {order.phone}</p>
              <p>Email: {order.email}</p>

              <p>Город: {order.city || "-"}</p>
              <p>ПВЗ: {order.pickupPoint || "-"}</p>
              <p>Адрес: {order.pickupAddress || "-"}</p>

              <p>
                Дата:{" "}
                {new Date(order.createdAt).toLocaleString("ru-RU")}
              </p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">
                Товары
              </h3>

              {order.items.map((item) => (
                <div key={item.id}>
                  {item.name} | Размер: {item.size} | Кол-во:{" "}
                  {item.quantity} | {item.price} ₽
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}