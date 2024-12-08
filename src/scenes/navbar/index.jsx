import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, lastName } = useSelector((state) => state.user);
  const theme = useTheme();
  const fullName = `${firstName} ${lastName}`;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { neutral, background } = theme.palette;

  const commonMenu = (
    <>
      <Tooltip title="Toggle Dark/Light Mode" arrow>
        <IconButton
          onClick={() => dispatch(setMode())}
          sx={{
            color: neutral.dark,
            transition: "all 0.3s ease-in-out",
            "&:hover": { backgroundColor: neutral.light },
          }}
        >
          {theme.palette.mode === "dark" ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Tooltip>

      <Tooltip title="Messages" arrow>
        <IconButton
          sx={{
            color: neutral.dark,
            transition: "all 0.3s ease-in-out",
            "&:hover": { backgroundColor: neutral.light },
          }}
        >
          <Message />
        </IconButton>
      </Tooltip>

      <Tooltip title="Notifications" arrow>
        <IconButton
          sx={{
            color: neutral.dark,
            transition: "all 0.3s ease-in-out",
            "&:hover": { backgroundColor: neutral.light },
          }}
        >
          <Notifications />
        </IconButton>
      </Tooltip>

      <Tooltip title="Help" arrow>
        <IconButton
          sx={{
            color: neutral.dark,
            transition: "all 0.3s ease-in-out",
            "&:hover": { backgroundColor: neutral.light },
          }}
        >
          <Help />
        </IconButton>
      </Tooltip>

      <FormControl variant="standard" value={fullName}>
        <Select
          value={fullName}
          sx={{
            backgroundColor: neutral.light,
            width: "180px",
            padding: "0.5rem 1rem",
            borderRadius: "12px",
            boxShadow: 1,
            fontWeight: 600,
          }}
          input={<InputBase />}
        >
          <MenuItem value={fullName}>
            <Typography fontWeight="bold">{fullName}</Typography>
          </MenuItem>
          <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
        </Select>
      </FormControl>
    </>
  );

  return (
    <FlexBetween
      padding="1rem 5%"
      backgroundColor={background.alt}
      boxShadow={3}
      sx={{
        borderBottom: `2px solid ${neutral.light}`,
        zIndex: 999,
      }}
    >
      <FlexBetween gap="2rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1.5rem, 2.5rem, 3rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            cursor: "pointer",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.1)" },
          }}
        >
          Connectify
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutral.light}
            borderRadius="12px"
            gap="1.2rem"
            padding="0.8rem 2rem"
            boxShadow={2}
            width="400px"
          >
            <InputBase
              placeholder="Search..."
              sx={{
                width: "100%",
                fontSize: "1rem",
                padding: "0.5rem",
              }}
            />
            <Tooltip title="Search" arrow>
              <IconButton sx={{ color: neutral.dark }}>
                <Search />
              </IconButton>
            </Tooltip>
          </FlexBetween>
        )}
      </FlexBetween>

      {isNonMobileScreens ? (
        <FlexBetween gap="3rem">{commonMenu}</FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          sx={{
            color: neutral.dark,
            transition: "all 0.3s ease-in-out",
            "&:hover": { backgroundColor: neutral.light },
          }}
        >
          <Menu />
        </IconButton>
      )}

      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="350px"
          minWidth="270px"
          backgroundColor={background.paper}
          padding="1rem"
          borderRadius="8px 0 0 8px"
          boxShadow={4}
          sx={{ transition: "transform 0.3s ease-in-out" }}
        >
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => setIsMobileMenuToggled(false)}>
              <Close />
            </IconButton>
          </Box>
          <FlexBetween flexDirection="column" alignItems="center" gap="1.5rem">
            {commonMenu}
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
