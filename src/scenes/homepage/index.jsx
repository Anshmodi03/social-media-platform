import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const theme = useTheme();
  const { palette } = theme;

  return (
    <Box
      sx={{
        backgroundColor: palette.background.default,
        minHeight: "100vh",
        color: palette.text.primary,
      }}
    >
      <Navbar />

      {/* Main Content Area */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isNonMobileScreens ? "row" : "column",
          gap: "2rem",
          padding: "2rem 4%",
          justifyContent: "space-between",
        }}
      >
        {/* Left Column - User Info */}
        <Box
          sx={{
            flexBasis: isNonMobileScreens ? "25%" : "100%",
            backgroundColor: palette.background.paper,
            borderRadius: "16px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "1.5rem",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              marginBottom: "1rem",
              color: palette.text.secondary,
            }}
          >
            User Profile
          </Typography>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        {/* Center Column - Posts and My Post */}
        <Box
          sx={{
            flexBasis: isNonMobileScreens ? "45%" : "100%",
            backgroundColor: palette.background.paper,
            borderRadius: "16px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "1.5rem",
            mt: isNonMobileScreens ? "0" : "2rem",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <MyPostWidget picturePath={picturePath} />
          <Box sx={{ mt: "1.5rem" }}>
            <PostsWidget userId={_id} />
          </Box>
        </Box>

        {/* Right Column - Ads and Friends List */}
        {isNonMobileScreens && (
          <Box
            sx={{
              flexBasis: "25%",
              backgroundColor: palette.background.paper,
              borderRadius: "16px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "1.5rem",
              position: "sticky",
              top: "1rem",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                marginBottom: "1rem",
                color: palette.text.secondary,
              }}
            >
              Sponsored
            </Typography>
            <AdvertWidget />
            <Box m="2rem 0" />
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                marginBottom: "1rem",
                color: palette.text.secondary,
              }}
            >
              Friends List
            </Typography>
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
