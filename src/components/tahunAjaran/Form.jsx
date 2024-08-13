import ButtonLoader from "../ButtonLoader.jsx";
import { DialogFooter } from "../ui/dialog.jsx";
import { Input } from "../ui/input.jsx";
import { Label } from "../ui/label.jsx";
import { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"





const Form = ({ mutate, isLoading, isEdit, currentData, updateGuru }) => {
    const [formData, setFormData] = useState({
        id: '',
        nama: '',
        tahunAwal: '',
        tahunAkhir: '',
        status: false,

    });

    // Debugging untuk memastikan data tersedia
    useEffect(() => {
        if (isEdit && currentData) {
            setFormData({

                id: currentData.id,
                nama: currentData.nama,
                tahunAwal: currentData.tahun_awal,
                tahunAkhir: currentData.tahun_akhir,
                status: currentData.status,

            });

        }
    }, [isEdit, currentData]);

   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            updateGuru.mutate(formData);
        } else {

            mutate(formData);
        }
    };

    return (
        <>
            <form autoComplete="false" onSubmit={handleSubmit} method="post" required>
                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="nip" className="text-right">
                            Tahun Awal
                        </Label>
                        <Input
                            id="nip"
                            name="tahunAwal"
                            type="number"
                            className="col-span-3"
                            defaultValue={isEdit ? currentData.tahun_awal : ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="namaLengkap" className="text-right">
                            Tahun Akhir
                        </Label>
                        <Input
                            id="namaLengkap"
                            name="tahunAkhir"
                            type="number"
                            className="col-span-3"
                            value={Number(formData.tahunAwal) + 1}
                            onChange={handleChange}
                            required
                            disabled
                        />
                    </div>
                    {isEdit && (

                        <div>
                        <Label htmlFor="namaLengkap" className="text-right">
                            Status
                        </Label>
                        
                        <Select onValueChange={(e) => handleChange({ target: { name: "status", value: e === "Aktif" ? true : false } })} value={formData.status ? "Aktif" : "Tidak Aktif"} required>
                            <SelectTrigger className="w-full" >
                                <SelectValue placeholder={'Tahun Ajaran'} />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value={"Aktif"} >Aktif</SelectItem>
                                <SelectItem value={"Tidak Aktif"} >Tidak Aktif</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    )}
                </div>
                <DialogFooter>
                    <ButtonLoader text={isEdit ? "Update Data" : "Tambah Data"} loading={isEdit ? updateGuru.isPending : isLoading} />
                </DialogFooter>
            </form>

        </>
    )
}

export default Form