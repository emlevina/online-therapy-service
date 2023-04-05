import React from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ClickAwayListener, MenuList, MenuItem, Paper, Popper, Grow, Divider } from '@mui/material';
import Auth from '../auth/Auth';

const ProfileMenu = ({ name, logout }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div>
            <Button
                ref={anchorRef}
                color='secondary'
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {name}
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Link to='/'>Dashboard</Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose} disabled>
                                        <Link to='/settings'>Settings</Link>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={logout} >Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}


const Navbar = ({ accessToken, setAccessToken, name = 'Profile' }) => {
    const navigate = useNavigate();
    const logout = () => {
        setAccessToken('')
        navigate('/auth')
    }

    const children = accessToken ? (
        <Auth>
            <ProfileMenu name={name} logout={logout} />
        </Auth>
    ) : (
        <div className='flex gap-2'>
            <NavLink to="/auth">
                <Button startIcon={<LockIcon color="disabled" fontSize="small" />}>Login</Button>
            </NavLink>
            <NavLink to='/auth/signup'>
                <Button className="text-nowrap" variant='contained'>Choose a therapist</Button>
            </NavLink>
        </div>

    )

    return (
        <header className="p-4 shadow-md shadow-slate-200">
            <nav className='container mx-auto flex row justify-between flex-nowrap items-center'>
                <NavLink className="" to='/'>
                    <img className="" alt="Ясно" src="https://assets.yasno.live/assets/logo-v3-5ca0495679167f6fe34df2f192ac48b2249b048fff2c9a6484effc52bda9ae0c.svg" />
                </NavLink>
                {children}
            </nav>
        </header>
    );
};

export default Navbar;