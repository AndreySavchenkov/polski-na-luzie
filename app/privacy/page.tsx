export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Политика конфиденциальности</h1>
      <div className="prose">
        <p>Последнее обновление: {new Date().toLocaleDateString()}</p>

        <h2>1. Сбор информации</h2>
        <p>Мы собираем следующую информацию:</p>
        <ul>
          <li>Email адрес</li>
          <li>Имя пользователя</li>
          <li>Прогресс обучения</li>
        </ul>

        <h2>2. Использование информации</h2>
        <p>Мы используем собранную информацию для:</p>
        <ul>
          <li>Предоставления образовательных услуг</li>
          <li>Отслеживания прогресса обучения</li>
          <li>Улучшения нашего сервиса</li>
        </ul>

        {/* Добавьте остальные разделы политики */}
      </div>
    </div>
  );
}
