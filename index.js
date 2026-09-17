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
        const idBaru = this.daftarBarang.length > 0 ? Math.max(...this.daftarBarang.map(b => b.id)) + 1 : 1;
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
            console.log(`ID: ${b.id} - ${b.nama} - Stok: ${b.stok} - Harga: Rp${b.harga} Nilai-Stok: ${nilaiStok}`)
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
            const stok = readlineSync.question("Stok awal: ");
            const harga = readlineSync.question("Harga satuan: ");

            try {
                if (nama.trim() === "") {
                    throw new Error("ERROR: Nama barang tidak boleh kosong!");
                }
                if (!stok.trim() || isNaN(stok) || stok < 0) {
                    throw new Error("ERROR: Stok harus diinput dan harus berupa angka juga tidak boleh minus!");
                }
                const stokNum = Number(stok);

                if (!harga.trim() || isNaN(harga) || harga < 1) {
                    throw new Error("ERROR: Harga harus diinput dan harus berupa angka juga tidak boleh kurang dari 1!");
                }
                const hargaNum = Number(harga);

                manager.tambah(nama, stokNum, hargaNum);
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
            const idMasuk = readlineSync.question("ID barang yang MASUK: ");
            let jumlahMasuk = readlineSync.question("Jumlah barang yang MASUK: ");

            try {
                if (!idMasuk.trim() || isNaN(idMasuk) || idMasuk < 1) {
                    throw new Error("ERROR: ID harus diinput dan harus berupa angka serta harus sesuai dengan barang yang ada!");
                }
                const idMasukNum = Number(idMasuk);

                if (!idMasuk.trim() || isNaN(jumlahMasuk) || jumlahMasuk < 1) {
                    throw new Error("ERROR: Jumlah barang masuk harus diinput dan harus berupa angka serta tidak boleh kurang dari 1!");
                }
                const jumlahMasukNum = Number(jumlahMasuk);

                manager.barangMasuk(idMasukNum, jumlahMasukNum);
                console.log("\nStok barang berhasil ditambahkan.");
                manager.simpan();
            } catch (error) {
                console.log(`\n${error.message}`);
            }
            break;

        case "4":
            const idKeluar = readlineSync.question("ID barang yang KELUAR: ");
            let jumlahKeluar = readlineSync.question("Jumlah barang yang KELUAR: ");
            try {
                if(!idKeluar.trim() || isNaN(idKeluar) || idKeluar < 1) {
                    throw new Error("ERROR: ID harus diinput dan harus berupa angka serta harus sesuai dengan barang yang ada!");
                }
                const idKeluarNum = Number(idKeluar);

                if(!jumlahKeluar.trim() || isNaN(jumlahKeluar) || jumlahKeluar < 1) {
                    throw new Error("ERROR: Jumlah barang keluar harus diinput dan harus berupa angka serta tidak boleh kurang dari 1!");
                }
                const jumlahKeluarNum = Number(jumlahKeluar);

                manager.barangKeluar(idKeluarNum, jumlahKeluarNum);
                manager.simpan();
            } catch (error) {
                console.log(`\n${error.message}`);
            }
            break;

        case "5":
            const idHapus = readlineSync.question("ID barang yang ingin DIHAPUS: ");

            try {
                if (!idHapus.trim() || isNaN(idHapus) || idHapus < 1) {
                    throw new Error("ERROR: ID harus diinput dan harus berupa angka serta tidak boleh kurang dari 1!");
                }
                const idHapusNum = Number(idHapus);

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