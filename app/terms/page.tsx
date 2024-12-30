export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Warunki korzystania</h1>
      <div className="prose">
        <p>Ostatnia aktualizacja: {new Date().toLocaleDateString()}</p>

        <h2>1. Akceptacja warunków</h2>
        <p>
          Korzystając z Polski Na Luzie, zgadzasz się z niniejszymi warunkami
          korzystania.
        </p>

        <h2>2. Opis usług</h2>
        <p>Polski Na Luzie zapewnia platformę do nauki języka polskiego.</p>

        {/* Dodaj pozostałe sekcje warunków */}
      </div>
    </div>
  );
}
