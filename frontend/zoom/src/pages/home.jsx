import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField, Paper, Box } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <>
            {/* Background image */}
            <Box sx={{
                minHeight: '100vh',
                width: '100vw',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                backgroundImage: 'url(/back.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.25) 0%, rgba(103, 58, 183, 0.25) 100%)',
                    zIndex: 1,
                }
            }} />

            {/* Navbar */}
            <Box className="navBar" sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 4,
                py: 2,
                background: 'rgba(255,255,255,0.7)',
                boxShadow: '0 2px 16px 0 rgba(31, 38, 135, 0.10)',
                backdropFilter: 'blur(8px)',
                borderRadius: 0,
                position: 'relative',
                zIndex: 2,
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, color: '#1976d2', fontWeight: 700, letterSpacing: 1 }}> <span style={{ color: "#FF9839" }}>Apna</span> Video Call</h2>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={() => navigate("/history")}
                        sx={{ color: '#673ab7', background: 'rgba(255,255,255,0.5)', mr: 1 }}>
                        <RestoreIcon />
                    </IconButton>
                    <span style={{ color: '#333', fontWeight: 500, marginRight: 8 }}>History</span>
                    <Button onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }}
                        variant="contained"
                        color="primary"
                        sx={{ fontWeight: 600, borderRadius: 2 }}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>

            {/* Main content (unchanged) */}
            <Box className="meetContainer" sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'calc(100vh - 80px)',
                px: 2,
                py: 4,
                gap: 4,
            }}>
                {/* Left Panel */}
                <Paper elevation={6} className="leftPanel" sx={{
                    flex: 1,
                    minWidth: 320,
                    maxWidth: 480,
                    p: { xs: 3, md: 5 },
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    background: 'rgba(255,255,255,0.92)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
                }}>
                    <h2 style={{ color: '#673ab7', fontWeight: 700, marginBottom: 16 }}>
                        Providing Quality Video Call<br />Just Like Quality Education
                    </h2>
                    <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                        <TextField
                            onChange={e => setMeetingCode(e.target.value)}
                            id="outlined-basic"
                            label="Meeting Code"
                            variant="outlined"
                            fullWidth
                            sx={{ background: '#fff', borderRadius: 2 }}
                        />
                        <Button
                            onClick={handleJoinVideoCall}
                            variant='contained'
                            color='primary'
                            sx={{ fontWeight: 700, px: 3, borderRadius: 2 }}
                        >
                            Join
                        </Button>
                    </Box>
                </Paper>
                {/* Right Panel */}
                <Box className='rightPanel' sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 320,
                    maxWidth: 520,
                    p: { xs: 2, md: 4 },
                }}>
                    <img
                        srcSet='/logo3.png'
                        alt="Video Call Visual"
                        style={{
                            width: '100%',
                            maxWidth: 400,
                            height: 'auto',
                            borderRadius: 24,
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
                            background: '#fff',
                        }}
                    />
                </Box>
            </Box>
        </>
    )
}

export default withAuth(HomeComponent)