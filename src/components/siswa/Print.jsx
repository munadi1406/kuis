import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "../ui/label"
import { useEffect, useState } from "react"
import ButtonLoader from "../ButtonLoader"
import { generatePdf } from "./generatePdf"
import { Button } from "../ui/button"


const Print = ({ open, setOpen, dataKelas, getKelasName }) => {

    const [filter, setFilter] = useState("")
    const [filterJenisKelamin, setFilterJenisKelamin] = useState("")


    useEffect(() => {
        setFilter("")
        setFilterJenisKelamin("")
    }, [])


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cetak Data</DialogTitle>
                    <div className="">
                        <Label htmlFor="Deskripsi">Filter Kelas</Label>
                        {dataKelas.isSuccess && (
                            <Select
                                disabled={dataKelas.isLoading}
                                required
                                defaultValue="semua"
                                onValueChange={(e) => {
                                    if (e === "semua") {
                                        setFilter("")
                                        return
                                    }
                                    const idKelas = dataKelas.isSuccess && dataKelas.data.data.find(datas => datas.kelas === e).id
                                    setFilter(idKelas)
                                }}
                            >
                                <SelectTrigger className="w-full"  >
                                    <SelectValue placeholder={"Pilih Kelas"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"semua"} >Semua</SelectItem>
                                    {dataKelas.isSuccess &&
                                        dataKelas.data.data.map(({ id, kelas }, i) => (
                                            <SelectItem value={kelas} key={i} id={i}>{kelas}</SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                    <div>
                        <Label className="text-right">
                            Filter Jenis Kelamin
                        </Label>

                        <Select onValueChange={(e) => {
                            if (e === "semua") {
                                setFilterJenisKelamin("")
                                return
                            }
                            setFilterJenisKelamin(e)
                        }}>
                            <SelectTrigger className="w-full" >
                                <SelectValue placeholder={'Jenis kelamin'} />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value="semua" >Semua</SelectItem>
                                <SelectItem value="Laki-laki" >Laki Laki</SelectItem>
                                <SelectItem value="Perempuan" >Perempuan</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </DialogHeader>

                <Button onClick={() => {
                    generatePdf(filter, `${filter ? `Kelas ${getKelasName(filter)}` : ''}`, getKelasName,filterJenisKelamin)
                }}> Cetak</Button>
            </DialogContent>
        </Dialog >

    )
}

export default Print