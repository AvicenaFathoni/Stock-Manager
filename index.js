let namaToko = "PedalWorks";
let tanggalHariIni = new Date();
console.log(`\n Selamat datang di ${namaToko}, tanggal hari ini:
    ${tanggalHariIni}\n`);

const daftarBarang = [   { id: 1, nama: "Pedal Anti-slip", stok: 24, harga: 45000},
                    { id: 2, nama: "Grease Anti-garing (125gr)", stok: 37, harga: 13000},
                    { id: 3, nama: "Mud Guard", stok: 40, harga: 20000},
                    { id: 4, nama: "Saddle Aero", stok: 17, harga: 65000},
                    { id: 5, nama: "Saddle Empuk++", stok: 9, harga: 40000},
                    { id: 6, nama: "Saddle Aja", stok: 44, harga: 20000},
                    { id: 7, nama: "WD-40", stok: 57, harga: 21000},
                    { id: 8, nama: "Chainguard", stok: 14, harga: 30000},
                    { id: 9, nama: "Brake Liquid", stok: 6, harga: 15000},
];

    console.log(`                       --=== STOK PEDALWORKS ===--`)
daftarBarang.forEach((b) => {
    nilaiStok = b.stok * b.harga;
    console.log(`ID: ${b.id} Nama: ${b.nama} Stok: ${b.stok} Harga: ${b.harga} Total nilai stok: ${nilaiStok}`)
});
