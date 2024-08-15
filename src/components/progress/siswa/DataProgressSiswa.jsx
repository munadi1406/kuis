import WithQuery from '@/utils/WithQuery'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Suspense, lazy, useEffect, useState } from 'react'
import SkeletonLoader from './SkeletonLoader';
import { Skeleton } from '@/components/ui/skeleton';
const CardProgress = lazy(() => import('./CardProgress'));
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import ButtonLoader from '@/components/ButtonLoader';
import { Button } from '@/components/ui/button';
import { printTeacherReport } from './print';


const DataProgressSiswa = ({ nisn, namaLengkap, createdAt }) => {
  const [filterYears, setFilterYears] = useState(`${new Date().getFullYear()}`);
  const [query, setQuery] = useState("");
  
  const {
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: [`progress-${nisn}`],
    queryFn: async ({ pageParam }) => {
      const response = await axios.get(
        `/api/siswa/progress/?nisn=${nisn}&id=${pageParam || 0}&search=${query}&years=${filterYears}`
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage.data.lastId,
    staleTime: 5000,
    initialPageParam: 0,
  });
  const handlePrint = useMutation({
    mutationFn: async () => {
      const response = await axios.get(
        `/api/siswa/progress/?nisn=${nisn}&search=${query}&years=${filterYears}&print=true`
      );
      return response.data.data;
    },
    onSuccess:(data)=>{
      printTeacherReport({namaLengkap,kuisPerBulanTahun: data.kuisDikerjakanPerBulanTahun, data: data.data,siswa:data.siswa })
    },
    
  });
  useEffect(() => {
    refetch()
  }, [ query, filterYears])


  let searchTimeout;
  const search = (e) => {
    const query = e.target.value;
    if (query.length > 0) {
      // setIsSearch(true);
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      searchTimeout = setTimeout(async () => {
        setQuery(query);
      }, 2000);
    } else {
      setQuery("");
      refetch()
    }
  };
  useEffect(() => {
    refetch();
  }, [query]);


  const [years, setYears] = useState([]);
  useEffect(() => {
    // Fungsi untuk mendapatkan tahun dari createdAt dan tahun saat ini
    const getYears = (createdAt) => {
      const startYear = new Date(createdAt).getFullYear();
      const currentYear = new Date().getFullYear();
      const yearsArray = [];
      for (let year = startYear; year <= currentYear; year++) {
        yearsArray.push(year);
      }
      return yearsArray;
    };

    // Set daftar tahun ke dalam state
    setYears(getYears(createdAt));
  }, [createdAt]);


  
  if (isLoading) {
    return <SkeletonLoader />
  }
  if (error) {
    return <div>Error </div>
  }

  return (
    <div>
      <div className="w-full py-2 flex justify-end gap-2">
        <div>
          <Input
            type="search"
            id="search"
            placeholder="Search"
            onChange={search}
            defaultValue={query}
            disabled={isLoading}
          />
        </div>
        <Select onValueChange={(e) => setFilterYears(e)} value={filterYears} disabled={isLoading}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div>
          <ButtonLoader onClick={() => {
            
            handlePrint.mutate()}} text={"Cetak"} loading={handlePrint.isPending} disabled={handlePrint.isPending}/>
        </div>
      </div>
      <h1 className='text-gray-600 text-2xl py-2'>{namaLengkap} Total Mengerjakan Kuis {data.pages
        .flatMap((page) => page.data.total)} Kuis </h1>
      <div className='bg-gray-100 p-3 rounded-md my-2'>
        <p className='text-gray-800 font-semibold text-xl'>Detail Total Mengerjakan Kuis</p>
        {data.pages[0].data.kuisDikerjakanPerBulanTahun.map((e, i) => (
          <p className="text-gray-900 " key={i}>{e.date} : {e.count}</p>
        ))
        }
      </div>
      <div className='flex flex-col gap-2'>
     
        <Suspense fallback={<Skeleton className="w-full h-[350px] rounded-md" />}>
          {data.pages
            .flatMap((page) => page.data.data)
            .map((e, i) => (
              <CardProgress key={i} data={e} />
            ))
          }
        </Suspense>

        {hasNextPage && (
          <ButtonLoader
            text={`${isFetchingNextPage ? "Loading..." : "Load More"}`}
            loading={isFetchingNextPage}
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
          />
        )}
      </div>
    </div>
  )
}

export default WithQuery(DataProgressSiswa)