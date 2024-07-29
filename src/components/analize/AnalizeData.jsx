import HtmlRender from '@/utils/HtmlRender'
import WithQuery from '@/utils/WithQuery'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


const AnalizeData = ({ id }) => {

  const { data, isLoading } = useQuery({
    queryKey: [`id-a-${id}`], queryFn: async () => {
      const data = await axios.get(`/api/analisis?id=${id}`)
      return data.data.data
    }
  })

  if (isLoading) {
    return <div>Loading....</div>
  }


  return (
    <div>
      <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Pertanyaan
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Hasil
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                            <HtmlRender data={item.soal} />
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                {item.hasil}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default WithQuery(AnalizeData)