import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button.jsx";
import { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label.jsx";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import WithQuery from "@/utils/WithQuery";
import { localTime } from "../../utils/localTime.js";
import { toast } from "../ui/use-toast.js";
import EditMapel from "./EditMapel.jsx";
import { generatePdf } from "./generatePdf.js";
import ButtonLoader from "../ButtonLoader.jsx";
import RatingStars from "../RatingStarts.jsx";
import Charts from "react-apexcharts";


const FeedbackData = ({ role, id }) => {
  console.log(role)

  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [mapel, setMapel] = useState("");
  const [msg, setMsg] = useState("");
  const [currentData, setCurrentData] = useState({ id: 0, mapel: 0 });
  const [query, setQuery] = useState("");
  const [ulasan, setUlasan] = useState("")
  const [rating, setRating] = useState(0)
  const handleRatingChange = (rating) => {
    setRating(rating)
    console.log("Selected rating:", rating);
  };


  const {
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["mapel"],
    queryFn: async ({ pageParam }) => {
      const response = await axios.get(
        `/api/feedback?id=${pageParam || 0}&search=${query}`
      );
      return response.data;
    },

    getNextPageParam: (lastPage) => lastPage.data.lastId,
    staleTime: 5000,
    initialPageParam: 0,
  });
           
           
           
  const chartRef = useRef(null);


  const { mutate, isPending } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      const createMapel = await axios.post("api/feedback", {
        rating, ulasan
      });
      return createMapel;
    },
    onSuccess: (data) => {
      refetch();
      toast({
        title: "Berhasil",
        description: `Rating Berhasil Dikirm`,
      });
    },
    onError: (error) => {
      setMsg(error.response.data.message);
      toast({
        title: "Gagal",
        variant: "destructive",
        description: `Mata Pelajaran Gagal Di Tambahkan`,
      });
    },
  });
  const deleteMapel = useMutation({
    mutationFn: async (id) => {
      const isDelete = await axios.delete(`api/mapel?id=${id}`);
      return isDelete;
    },
    onSuccess: (data) => {
      refetch();
      toast({
        title: "Berhasil",
        description: `Mata Pelajaran Berhasil Di Hapus`,
      });
    },
    onError: (error) => {

      toast({
        title: "Gagal",
        variant: "destructive",
        description: `Mata Pelajaran Gagal Di Hapus`,
      });
    },
  });
  const updateMapel = useMutation({
    mutationFn: async ({ e, id, mapel }) => {
      e.preventDefault();
      const isUpdate = await axios.put(`api/mapel`, {
        id,
        mataPelajaran: mapel,
      });
      return isUpdate;
    },
    onSuccess: (data) => {
      refetch();
      setIsDialogEditOpen(false);
      toast({
        title: "Berhasil",
        description: `Mata Pelajaran Berhasil Di Update`,
      });
    },
    onError: (error) => {

      toast({
        title: "Gagal",
        variant: "destructive",
        description: `Mata Pelajaran Gagal Di Update`,
      });
    },
  });
  let searchTimeout;
  const search = (e) => {
    const query = e.target.value;
    if (query.length > 3) {
      // setIsSearch(true);
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      searchTimeout = setTimeout(async () => {
        setQuery(query);
      }, 2000);
    } else {
      setQuery("");
    }
  };

  useEffect(() => {
    refetch();
  }, [query]);

  
    const getPngURI = async () => {
      if (chartRef.current) {
        try {
          const chart = chartRef.current.chart;
          const uri = await chart.dataURI();
          generatePdf(uri.imgURI)
          console.log(uri); // Data URI dari PNG
        } catch (error) {
          console.error('Error generating PNG URI:', error);
        }
        // Ini adalah data URI dari PNG, bisa digunakan untuk download, preview, dll.
      }
    };

  

  if (isLoading) {
    return <>Loading...</>;
  }


  const ratingStats = data.pages[0].data.ratingStats

  const labels = ratingStats.map(stat => `Rating ${stat.rating}`);
  const datas = ratingStats.map(stat => stat.percentage);

  return (
    role === "admin" ? (
      <div>
        <Charts type="bar"
        ref={chartRef}
          options={{
            chart: {
              height: 350,
              type: 'bar',
            },
            plotOptions: {
              bar: {
                borderRadius: 10,
                dataLabels: {
                  position: 'top', // top, center, bottom
                },
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val + "%";
              },
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#304758"]
              }
            },

            xaxis: {
              categories: labels,
              position: 'top',
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  }
                }
              },
              tooltip: {
                enabled: true,
              }
            },
            yaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
                formatter: function (val) {
                  return val + "%";
                }
              }

            },
            title: {
              text: 'Statistik Rating',
              floating: true,
              offsetY: 330,
              align: 'center',
              style: {
                color: '#444'
              }
            },
           
          }}
          series={[
            {
              data: datas,
            },
          ]}
          height={350} />

        <div className="w-full flex justify-between items-end  border-b  p-2">
          <div className="flex items-end justify-end gap-2">

            <Button
              onClick={() => getPngURI()}
              disabled={!data || data.length <= 0}
            >
              Cetak
            </Button>
          </div>
        </div>
        <Table>
          <TableCaption>Daftar Mata Pelajaran</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Ulasan</TableHead>
              <TableHead>Created At</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {data.pages &&
              data.pages
                .flatMap((page) => page.data.data)
                .map(({ created_at, id, rating, ulasan }, i) => (
                  <TableRow key={id}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell>{rating}</TableCell>
                    <TableCell>{ulasan}</TableCell>
                    <TableCell>{localTime(created_at)}</TableCell>

                  </TableRow>
                ))}
          </TableBody>
        </Table>
        {hasNextPage && (
          <ButtonLoader
            text={`${isFetchingNextPage ? "Loading..." : "Load More"}`}
            loading={isFetchingNextPage}
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
          />
        )}
        <EditMapel
          isDialogOpen={isDialogEditOpen}
          setIsDialogOpen={setIsDialogEditOpen}
          data={currentData}
          mutate={updateMapel}
        />
      </div>
    ) : (
      <div>
        <form autoComplete="false" onSubmit={mutate} method="post">
          <div className="grid gap-4 py-4">
            <div className="border p-4 rounded">
              <Label htmlFor="rating" className="text-right mb-2">
                Berikan Penilaian Anda
              </Label>
              <RatingStars onRatingChange={handleRatingChange} />
            </div>

            <div>
              <Label htmlFor="feedback" className="text-right">
                Masukkan Masukan atau Keluhan Anda
              </Label>
              <textarea
                id="feedback"
                name="feedback"
                className="w-full p-2 mt-2 border rounded"
                rows="4"
                placeholder="Tuliskan masukan atau keluhan Anda di sini..."
                onChange={(e) => setUlasan(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <ButtonLoader text={"Kirim Masukan"} loading={isPending} type="submit" />
        </form>



      </div>
    )
  );
};

export default WithQuery(FeedbackData);
