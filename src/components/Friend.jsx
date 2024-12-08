import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween
      sx={{
        backgroundColor: palette.background.paper,
        padding: "1rem",
        borderRadius: "0.75rem",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              transition: "color 0.3s ease",
              "&:hover": {
                color: primaryLight,
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.85rem" fontStyle="italic">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      <IconButton
        onClick={() => patchFriend()}
        sx={{
          backgroundColor: isFriend ? primaryLight : palette.secondary.light,
          p: "0.7rem",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
          transition: "background-color 0.3s ease, transform 0.3s ease",
          "&:hover": {
            backgroundColor: isFriend ? primaryDark : palette.secondary.dark,
            transform: "scale(1.1)",
          },
        }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: "black" }} />
        ) : (
          <PersonAddOutlined sx={{ color: "black" }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
