import { useState } from 'react';
import { useClipboard } from 'use-clipboard-copy';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { QRCode } from 'react-qrcode-logo';


const ShareQuiz = ({ id }) => {

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
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Bagikan</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Bagikan Kuis</DialogTitle>
                   
                </DialogHeader>
                <div className="flex items-center justify-center space-x-2">
                    <QRCode value={`${import.meta.env.PUBLIC_BASE_URL}take/${id}`}  />

                </div>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
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
            </DialogContent>
        </Dialog>
    )
}

export default ShareQuiz