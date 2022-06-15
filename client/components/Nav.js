import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Link from 'next/link';
import Logo from './Logo';

const Nav = ({ isUser, quizCode }) => {
    const router = useRouter();
    const pages = (isUser) ? ["MAIN", 'MY PAGE', 'SIGN OUT'] : ["MAIN", 'SIGN IN', 'SIGN UP'];

    const handleOpenNavMenu = (event) => {
        document.getElementById('menu-appbar').classList = 'menuList';
    };

    const handleCloseNavMenu = (event) => {
        const data = event.currentTarget.innerText;
        document.getElementById('menu-appbar').classList = 'menuList invisible';

        if (data == 'MY PAGE') {
            router.push({
                pathname: '/personalPage/[id]',
                query: { id: quizCode },
            })
        }
        else if (data == 'SIGN OUT') router.push('/signOut');
        else if (data == 'SIGN IN') router.push('/signIn');
        else if (data == 'SIGN UP') router.push('/signUp');
        else if (data == 'MAIN') router.push('/');
    };

    return (
        <div position="fixed" className='navBar'>
            <Box sx={{  }}>
                <button
                    onClick={handleOpenNavMenu}
                    className="menuBtn"
                ></button>
                <div
                    id="menu-appbar"
                    className='menuList invisible'
                    onClick={handleCloseNavMenu}
                    sx={{
                        xs: 'block',
                        borderRadius: '0',
                    }}
                >
                    {pages.map((page) => (
                        <div key={page} onClick={handleCloseNavMenu} className='menuItem'>
                            <Typography>{page}</Typography>
                        </div>
                    ))}
                </div>
            </Box>
        </div>
    );
}

export default Nav