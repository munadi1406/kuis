import pdfMake from "pdfmake/build/pdfmake";
import { pdfMakeFonts } from "../users/generatePdf";
import edjsHTML from "editorjs-html";
import axios from "axios";
import htmlToPdfmake from "html-to-pdfmake";


pdfMake.fonts = pdfMakeFonts;
const edjsParser = edjsHTML();


const fetchImageAsDataURL = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
export const printQuestions = async (title, id) => {


    try {
        const { data } = await axios.get(`/api/quiz/print?id=${id}`)

        // Process each question to handle images
        const processQuestion = async (questionData, index) => {
            const htmlString = edjsParser.parse(questionData.question).join('');
            const htmlContent = htmlToPdfmake(htmlString);

            // Check for images in htmlContent and replace URLs with data URLs
            const processedContent = await Promise.all(htmlContent.map(async (item) => {
                if (item.image) {
                    item.image = await fetchImageAsDataURL(item.image);
                }
                return item;
            }));

            return {
                columns: [
                    {
                        width: 'auto',
                        stack: [
                            {
                                text: `${index + 1}.`,
                                style: 'questionNumber',
                                margin: [0, 10, 10, 5], // Atur margin sesuai kebutuhan
                            },
                            {
                                text: ' ', // Placeholder untuk memberikan jarak
                                style: 'questionText', // Atur jarak dengan style jika perlu
                            },
                        ],
                    },
                    {
                        width: '*',
                        stack: [
                            {
                                text: '', // Placeholder untuk memberikan jarak antara nomor dan teks
                                style: 'questionText',
                                margin: [0, 0, 0, 5],
                            },
                            ...processedContent,
                            ...questionData.options.map((option, optionIndex) => ({
                                text: `${String.fromCharCode(65 + optionIndex)}. ${option.option}`,

                                margin: [0, 2, 0, 2],
                            })),
                        ],
                    },
                ],
            };
        };

        const questionsContent = await Promise.all(data.data.map((questionData, index) =>
            processQuestion(questionData, index)
        ));

        const documentDefinition = {
            content: [
                {
                    text: `Soal Kuis ${title}`,
                    style: 'header',
                    alignment: 'center',
                    margin: [0, 0, 0, 10],
                },

                {
                    width: '*',
                    text: `Nama:`,
                    style: 'info',
                    margin: [0, 0, 0, 5],
                },
                {
                    width: '*',
                    text: `Kelas: `,
                    style: 'info',
                    margin: [0, 0, 0, 5],
                },
                {
                    width: '*',
                    text: `Tanggal: `,
                    style: 'info',
                    margin: [0, 0, 0, 5],
                },
                ...questionsContent,
                { text: '', pageBreak: 'after' },
                {
                    text: `Kunci Jawaban`,
                    style: 'header',
                    alignment: 'center',
                    margin: [0, 10, 0, 10],
                },
                {
                    ol: data.data.map((questionData, index) => ({
                        text: `${String.fromCharCode(65 + questionData.options.findIndex(option => option.option_is_true))}`,
                        style: 'answerKey',
                        margin: [0, 2, 0, 2],
                    })),
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                },
                question: {
                    fontSize: 14,
                    bold: true,
                },
                option: {
                    fontSize: 12,
                },
                correctOption: {
                    fontSize: 12,
                    color: 'green',
                },
                answerKey: {
                    fontSize: 12,
                    bold: true,
                },
            },
        };

        // Create and download the PDF
        pdfMake.createPdf(documentDefinition).download(`Soal Kuis ${title}.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};
