
const Desc = () => {
  return (
    <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Penjelasan Metode Perhitungan dan Kategori Kesulitan</h1>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Metode Perhitungan:</h2>
                    <p className="text-gray-700 mb-4">
                        Metode yang digunakan untuk menghitung kesulitan kuis dalam kode ini adalah <strong>Item Response Theory (IRT)</strong>, khususnya metode <strong>Logistic Regression</strong>. IRT adalah pendekatan statistik yang digunakan untuk menganalisis respons individu terhadap item atau pertanyaan dalam tes atau kuis. Dalam hal ini, kami menggunakan parameter kesulitan yang dihitung menggunakan logistik regresi.
                    </p>
                    <h3 className="text-lg font-semibold mb-2">Perhitungan Kesulitan:</h3>
                    <ol className="list-decimal list-inside text-gray-700 mb-4">
                        <li><strong>Pengumpulan Data:</strong> Mengumpulkan data jawaban siswa untuk setiap pertanyaan dalam kuis.</li>
                        <li><strong>Perhitungan Parameter Kesulitan:</strong> Menghitung parameter kesulitan menggunakan rumus:
                            <pre className="bg-gray-200 p-2 rounded-lg text-sm text-gray-800 mt-2">
                                difficulty = -log(p / (1 - p))
                            </pre>
                            Di mana <em>p</em> adalah proporsi jawaban benar dari total percobaan.
                            <ul className="list-disc list-inside mt-2">
                                <li>Jika semua jawaban benar (p = 1), kesulitan dianggap sebagai <strong>-∞</strong>.</li>
                                <li>Jika semua jawaban salah (p = 0), kesulitan dianggap sebagai <strong>+∞</strong>.</li>
                                <li>Untuk nilai p di antara 0 dan 1, kesulitan dihitung dengan rumus logistik.</li>
                            </ul>
                        </li>
                        <li><strong>Deskripsi Kategori Kesulitan:</strong> Berdasarkan nilai parameter kesulitan, deskripsi diberikan untuk memberikan interpretasi yang lebih mudah dimengerti.</li>
                    </ol>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Kategori Kesulitan Kuis:</h2>
                    <div className="grid grid-cols-1 gap-4">

                        <div className="bg-green-100  border border-green-300 rounded-lg p-4 shadow-md">
                            <h3 className="text-lg font-semibold text-green-800">Mudah</h3>
                            <p className="text-gray-700">Parameter kesulitan: ≤ -1.0</p>
                            <p className="text-gray-700">Deskripsi: Pertanyaan yang umumnya dipahami dengan baik oleh siswa.</p>
                        </div>


                        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 shadow-md">
                            <h3 className="text-lg font-semibold text-yellow-800">Sedang</h3>
                            <p className="text-gray-700">Parameter kesulitan: -1.0 hingga 1.0</p>
                            <p className="text-gray-700">Deskripsi: Pertanyaan dengan tingkat kesulitan moderat yang membutuhkan pemahaman yang lebih dalam.</p>
                        </div>


                        <div className="bg-red-100 border border-red-300 rounded-lg p-4 shadow-md">
                            <h3 className="text-lg font-semibold text-red-800">Sulit</h3>
                            <p className="text-gray-700">Parameter kesulitan: {'>'} 1.0</p>
                            <p className="text-gray-700">Deskripsi: Pertanyaan yang cukup menantang dan mungkin memerlukan usaha lebih untuk dipahami dan dijawab dengan benar.</p>
                        </div>
                    </div>
                </section>
            </div>
  )
}

export default Desc