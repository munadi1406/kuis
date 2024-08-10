import { useEffect, useState } from 'react';
import { useClipboard } from 'use-clipboard-copy';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { QRCode } from 'react-qrcode-logo';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { printLink } from './printLink';


const ShareQuiz = ({ id, idKelas, token,title }) => {


    const [copied, setCopied] = useState(false);
    const clipboard = useClipboard({ copiedTimeout: 4000 });
    
    const handleCopy = () => {
        try {
            clipboard.copy(`${import.meta.env.PUBLIC_BASE_URL}take/${id}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Copy error:', error);
        }
    };

    const { data, isLoading } = useQuery({
        queryKey: [`student-${id}`], queryFn: async () => {
            const datas = await axios.get(`/api/kelas/student?id_kelas=${idKelas}`)
            return datas.data.data
        }
    })
    console.log("idKelas")
    // console.log(data);
    if (isLoading) {
        return <div>Loading...</div>
    }
    const handleCopyUsers = () => {
        const links = data
          .map(({ siswa }) =>
            siswa
              .map((e) => `${e.nama_lengkap} : ${import.meta.env.PUBLIC_BASE_URL}take/${id}/?nisn=${e.nisn}&token=${token}`)
              .join('\n')
          )
          .join('\n');
    
        clipboard.copy(links);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset status after 2 seconds
      };



    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Bagikan</Button>
            </DialogTrigger>
            <DialogContent className="sm:w-[600px]">
                <DialogHeader>
                    <DialogTitle>Bagikan Kuis</DialogTitle>

                </DialogHeader>
                <div className="flex items-center justify-center space-x-2">
                    <QRCode value={`${import.meta.env.PUBLIC_BASE_URL}take/${id}`} />

                </div>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" >
                            Link Umum
                        </Label>
                        <Input
                            id="link"
                            defaultValue={`${import.meta.env.PUBLIC_BASE_URL}take/${id}`}
                            readOnly
                        />
                    </div>
                    <Button onClick={handleCopy} type="button" size="sm" className="px-3">
                        <p>{copied ? 'Copied!' : 'Copy'}</p>
                    </Button>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" >
                            Link Spesifik
                        </Label>
                        <div className="w-full overflow-auto text-xs bg-white border rounded-md p-2 max-h-40">
                            {data.map(({ siswa }) =>
                                siswa.map((e, idx) => (
                                    <div key={idx} className="py-1 border-b last:border-none">
                                        <p className="truncate">
                                            <span className="font-semibold">{e.nama_lengkap}:</span> {import.meta.env.PUBLIC_BASE_URL}take/{id}/?nisn={e.nisn}&token={token}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <Button onClick={handleCopyUsers} type="button" size="sm" className="px-3">
                        <p>{copied ? 'Copied!' : 'Copy'}</p>
                    </Button>
                </div>
                <Button onClick={()=>printLink(id,title,data,token)}>Export PDF</Button>
            </DialogContent>
        </Dialog>
    )
}

export default ShareQuiz