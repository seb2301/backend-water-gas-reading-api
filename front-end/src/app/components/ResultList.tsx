import { IResultsProps } from '../interfaces/IResultsProps';
import { Box } from '@mui/material';
import { formatDateTime } from '../utils';
import Image from 'next/image';

export default function ResultList({ results }: IResultsProps) {
    return (
        <div className='table-container'>
            <Box className='home-menu'>
                <table>
                    <thead>
                        <tr>
                            <th>UUID</th>
                            <th>Measure at</th>
                            <th>Type</th>
                            <th>Confirmed?</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                    {results.measures.map((measure) => (
                        <tr key={measure.uuid}>
                            <td>{measure.uuid}</td>
                            <td>{formatDateTime(measure.measured_datetime)}</td>
                            <td>{measure.measure_type}</td>
                            <td>{measure.has_confirmed ? "Yes" : "No"}</td>
                            <td>
                                {measure.image_url && (
                                    <Image
                                        src={measure.image_url}
                                        alt="Measure"
                                        width={50}
                                        height={50}
                                        style={{ borderRadius: '5px' }}
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Box>
        </div>
    );
}
