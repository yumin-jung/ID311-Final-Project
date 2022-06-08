import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { UserContext } from '../context/UserContext';

const Nav = () => {
    const router = useRouter();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [pages, setPages] = React.useState([]);

    const { isUser, setIsUser, quizCode, setQuizCode } = useContext(UserContext);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    console.log(quizCode)
    React.useEffect(() => {
        if (quizCode != '') {
            setPages(['personal page', 'sign out']);
        }
        else {
            setPages(['sign in']);
        }
        console.log(pages, 'rendering')
    }, []);

    const handleCloseNavMenu = (event) => {
        setAnchorElNav(null);
        console.log(event.currentTarget.innerText)
        const data = event.currentTarget.innerText;


        if (data == 'PersonalPage') router.push('/personalPage', undefined, { shallow: true });
        else if (data == 'SignOut') router.push('/signOut', undefined, { shallow: true });
        else if (data == 'sign in') router.push('/signIn', undefined, { shallow: true })
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <LiveHelpIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'roboto',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        QUIZ
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' }
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <LiveHelpIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'roboto',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        QUIZ
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <MenuItem
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Typography>{page}</Typography>
                            </MenuItem>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Nav