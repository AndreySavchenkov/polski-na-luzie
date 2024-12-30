export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Условия использования</h1>
      <div className="prose">
        <p>Последнее обновление: {new Date().toLocaleDateString()}</p>

        <h2>1. Принятие условий</h2>
        <p>
          Используя Polski Na Luzie, вы соглашаетесь с настоящими условиями
          использования.
        </p>

        <h2>2. Описание услуг</h2>
        <p>
          Polski Na Luzie предоставляет платформу для изучения польского языка.
        </p>

        {/* Добавьте остальные разделы условий */}
      </div>
    </div>
  );
}
