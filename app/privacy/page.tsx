export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Polityka prywatności</h1>
      <div className="prose">
        <p>Ostatnia aktualizacja: {new Date().toLocaleDateString()}</p>

        <h2>1. Gromadzenie informacji</h2>
        <p>Gromadzimy następujące informacje:</p>
        <ul>
          <li>Adres email</li>
          <li>Nazwa użytkownika</li>
          <li>Postępy w nauce</li>
        </ul>

        <h2>2. Wykorzystanie informacji</h2>
        <p>Wykorzystujemy zebrane informacje do:</p>
        <ul>
          <li>Świadczenia usług edukacyjnych</li>
          <li>Śledzenia postępów w nauce</li>
          <li>Ulepszania naszych usług</li>
        </ul>

        {/* Dodaj pozostałe sekcje polityki */}
      </div>
    </div>
  );
}
