import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([])
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // IMPLEMENT SNACKBAR
            }
        }
        fetchHistory();
    }, [])

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();
        return `${day}/${month}/${year}`
    }

    // Filter unique meeting codes (latest date)
    const uniqueMeetings = Array.from(
        meetings.reduce((map, obj) => {
            if (!map.has(obj.meetingCode) || new Date(obj.date) > new Date(map.get(obj.meetingCode).date)) {
                map.set(obj.meetingCode, obj);
            }
            return map;
        }, new Map()).values()
    );

    return (
        <Box sx={{
            minHeight: '100vh',
            width: '100vw',
            position: 'relative',
            overflow: 'auto',
        }}>
            {/* Background image and overlay */}
            <Box sx={{
                minHeight: '100vh',
                width: '100vw',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -2,
                backgroundImage: 'url(/back.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }} />
            <Box sx={{
                minHeight: '100vh',
                width: '100vw',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                bgcolor: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(2px)',
            }} />

            {/* Content */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                minHeight: '100vh',
                pt: 6,
                px: 2,
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <IconButton onClick={() => routeTo("/home")}
                        sx={{
                            color: '#1976d2',
                            background: 'rgba(255,255,255,0.8)',
                            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
                            mr: 2,
                        }}>
                        <HomeIcon fontSize="large" />
                    </IconButton>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#673ab7', letterSpacing: 1 }}>
                        Meeting History
                    </Typography>
                </Box>
                <Box sx={{ width: '100%', maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {uniqueMeetings.length !== 0 ? uniqueMeetings.map((e, i) => (
                        <Card key={i} variant="outlined" sx={{
                            borderRadius: 4,
                            boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)',
                            background: 'rgba(255,255,255,0.95)',
                        }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#1976d2' }} gutterBottom>
                                    Code: {e.meetingCode}
                                </Typography>
                                <Typography sx={{ mb: 1.5, color: '#555' }}>
                                    Date: {formatDate(e.date)}
                                </Typography>
                            </CardContent>
                        </Card>
                    )) : (
                        <Typography variant="h6" sx={{ color: '#888', textAlign: 'center', mt: 6 }}>
                            No meeting history found.
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    )
}