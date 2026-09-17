const readlineSync = require("readline-sync");
const fs = require("fs");

let namaToko = "PedalWorks";
let tanggalHariIni = new Date();
console.log("\nAvicena Fathoni Fawwaz XI-RPL 2 [06]");
console.log(`Selamat datang di ${namaToko}, tanggal hari ini:
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
        if(this.daftarBarang.length === 0) {
            console.log(`\n[--=== BARANG BELUM ADA ===--]`);
        }
        if(this.daftarBarang.length > 0) {
        console.log(`\n[--=== Stok PedalWorks ===--]`);
        }
        this.daftarBarang.forEach(b => {
            let nilaiStok = b.stok * b.harga;
            console.log(`ID: ${b.id} - ${b.nama} - Stok: ${b.stok} - Rp${b.harga} Nilai Stok: ${nilaiStok}`)
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
            console.log("\nERROR: Stok tidak mencukupi!");
        }
    }

    hapus(id) {
        this.daftarBarang = this.daftarBarang.filter((b) => b.id !== id);
    }

    cekStokMenipis(batas = 10) {
        return this.daftarBarang.filter(b => b.stok <= batas);
    }

    simpan() {
        fs.writeFileSync("stok.json", JSON.stringify(this.daftarBarang, null, 2));
    }

    muat() {
        if (fs.existsSync("stok.json")) {
            const data = fs.readFileSync("stok.json", "utf-8");
            this.daftarBarang = JSON.parse(data);
        }
    }
}

const manager = new StokManager();

console.log(`[--=== STOCK MANAGEMENT ===--]`);

manager.muat();

while (true) {
    console.log(`\n[--=== PILIH MENU ===--]`)
    console.log("1. Tambah Barang\n2. Lihat Stok\n3. Barang Masuk\n4. Barang Keluar\n5. Hapus Barang\n6. Cek Stok Menipis\n7. Keluar");
    const pilihan = readlineSync.question("Pilih menu: ");

    switch (pilihan) {
        case "1": {
            const nama = readlineSync.question("Nama barang: ");
            const stok = Number(readlineSync.question("Stok awal: "));
            const harga = Number(readlineSync.question("Harga satuan: "));

            try {
                if (nama.trim() === "") {
                    throw new Error("ERROR: Nama barang tidak boleh kosong!");
                }
                if (isNaN(stok) || stok < 0) {
                    throw new Error("ERROR: Stok harus diinput dan harus berupa angka juga tidak boleh minus!");
                }
                if (isNaN(harga) || harga < 1) {
                    throw new Error("ERROR: Harga harus diinput dan harus berupa angka juga tidak boleh kurang dari 1!");
                }

                manager.tambah(nama, stok, harga);
                console.log("\nBarang berhasil ditambahkan.");
                manager.simpan();
            } catch (error) {
                console.log(`\n${error.message}`);
            }
            break;
        }

        case "2":
            manager.tampilkan();
            break;

        case "3":
            const idMasuk = Number(readlineSync.question("ID barang yang MASUK: "));
            let jumlahMasuk = Number(readlineSync.question("Jumlah barang yang MASUK: "));

            try {
                if (isNaN(idMasuk) || idMasuk < 1) {
                    throw new Error("ERROR: ID harus diinput dan harus berupa angka serta harus sesuai dengan barang yang ada!");
                }
                if (isNaN(jumlahMasuk) || jumlahMasuk < 1) {
                    throw new Error("ERROR: Jumlah barang masuk harus diinput dan harus berupa angka serta tidak boleh kurang dari 1!");
                }
                manager.barangMasuk(idMasuk, jumlahMasuk);
                console.log("\nStok barang berhasil ditambahkan.");
                manager.simpan();
            } catch (error) {
                console.log(`\n${error.message}`);
            }
            break;

        case "4":
            const idKeluar = Number(readlineSync.question("ID barang yang KELUAR: "));
            let jumlahKeluar = Number(readlineSync.question("Jumlah barang yang KELUAR: "));
            try {
                if(isNaN(jumlahKeluar) || jumlahKeluar < 1) {
                    throw new Error("ERROR: Jumlah barang keluar harus diinput dan harus berupa angka serta tidak boleh kurang dari 1!");
                }
                manager.barangKeluar(idKeluar, jumlahKeluar);
                manager.simpan();
            } catch (error) {
                console.log(`\n${error.message}`);
            }
            break;

        case "5":
            const idHapus = Number(readlineSync.question("ID barang yang ingin DIHAPUS: "));

            try {
                if (isNaN(idHapus) || idHapus < 1) {
                    throw new Error("ERROR: ID harus diinput dan harus berupa angka serta tidak boleh kurang dari 1!");
                }
                manager.hapus(idHapus);
                console.log("\nBarang berhasil dihapus.");
                manager.simpan();
            } catch (error) {
                console.log(`\n${error.massage}`);
            }
            break;

        case "6":
            const stokMenipis = manager.cekStokMenipis();
            console.log("\n[!] --=== STOK MENIPIS ===-- [!]");
            stokMenipis.forEach(b => {
                console.log(`ID: ${b.id} - ${b.nama} - Stok: ${b.stok}`)
            });
            break;

        case "7":
            process.exit(0);
    }
}