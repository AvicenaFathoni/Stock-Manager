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
        console.log(`                       --=== STOK PEDALWORKS ===--`)
        this.daftarBarang.forEach(b => {
            nilaiStok = b.stok * b.harga;
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
        return this.daftarBarang.filter((b) => b.stok <= batas);
    }
}