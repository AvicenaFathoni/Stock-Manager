const readlineSync = require("readline-sync");

let namaToko = "PedalWorks";
let tanggalHariIni = new Date();
console.log(`\n Selamat datang di ${namaToko}, tanggal hari ini:
    ${tanggalHariIni}\n`);

class StokManager {
    constructor() {
        this.daftarBarang = [];
    }

    tambah(nama, stok, harga) {
        const idBaru = this.daftarBarang.length + 1;
        this.daftarBarang.push({ id: idBaru, nama, stok, harga });
    }

    tampilkan() {
        console.log(`\n+===============+`);
        console.log(`|Stok PedalWorks|`);
        console.log(`+===============+\n`);

        this.daftarBarang.forEach(b => {
            let nilaiStok = b.stok * b.harga;
            console.log(`${b.id} - ${b.nama} - Stok: ${b.stok} - Rp${b.harga} Nilai Stok: ${nilaiStok}`)
        });
    }

    barangMasuk(id, jumlah) {
        const barang = this.daftarBarang.find((b) => b.id === id);
        if (barang) barang.stok += jumlah;
    }

    barangKeluar(id, jumlah) {
        const barang = this.daftarBarang.find((b) => b.id === id);
        if (barang && barang.stok >= jumlah) {
            barang.stok -= jumlah;
        } else {
            console.log("Stok tidak mencukupi!");
        }
    }

    hapus(id) {
        this.daftarBarang = this.daftarBarang.filter((b) => b.id !== id);
    }

    cekStokMenipis(batas = 10) {
        return this.daftarBarang.filter(b => b.stok <= batas);
    }
}

const manager = new StokManager();

console.log(`[--=== STOCK MANAGEMENT ===--]`);

while (true) {
    console.log("\n1. Tambah Barang\n2. Lihat Stok\n3. Barang Masuk\n4. Barang Keluar\n5. Hapus Barang\n6. Cek Stok Menipis\n7. Keluar");
    const pilihan = readlineSync.question("Pilih menu: ");

    switch (pilihan) {
        case "1": {
            const nama = readlineSync.question("Nama barang: ");
            const stok = Number(readlineSync.question("Stok awal: "));
            const harga = Number(readlineSync.question("Harga satuan: "));

            manager.tambah(nama, stok, harga);
            break;
        }

        case "2":
            manager.tampilkan();
            break;

        case "3":
            const idMasuk = Number(readlineSync.question("ID barang yang MASUK: "));
            let jumlahMasuk = Number(readlineSync.question("Jumlah barang yang MASUK: "));

            manager.barangMasuk(idMasuk, jumlahMasuk);
            break;

        case "4":
            const idKeluar = Number(readlineSync.question("ID barang yang KELUAR: "));
            let jumlahKeluar = Number(readlineSync.question("Jumlah barang yang KELUAR: "));

            manager.barangKeluar(idKeluar, jumlahKeluar);
            break;

        case "5":
            const idHapus = Number(readlineSync.question("ID barang yang ingin DIHAPUS: "));

            manager.hapus(idHapus);
            break;

        case "6":
            const stokMenipis = manager.cekStokMenipis();

            stokMenipis.forEach(b => {
                console.log(`${b.id} - ${b.nama} - Stok: ${b.stok}`);
            });
            break;

        case "7":
            process.exit(0);
    }
}