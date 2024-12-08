import { Typography, useTheme, Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper
      sx={{
        p: "1.5rem",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "1rem",
      }}
    >
      <FlexBetween mb="1rem">
        <Typography color={dark} variant="h5" fontWeight="600">
          Sponsored
        </Typography>
        <Typography
          color={medium}
          sx={{
            cursor: "pointer",
            "&:hover": { color: dark, textDecoration: "underline" },
          }}
        >
          Create Ad
        </Typography>
      </FlexBetween>

      <Box
        component="img"
        src="http://localhost:3001/assets/info4.jpeg"
        alt="advert"
        sx={{
          width: "100%",
          height: "auto",
          borderRadius: "1rem",
          mb: "1rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
      />

      <FlexBetween mb="0.5rem">
        <Typography color={main} variant="h6" fontWeight="500">
          MikaCosmetics
        </Typography>
        <Typography
          color={medium}
          sx={{ cursor: "pointer", "&:hover": { color: dark } }}
        >
          mikacosmetics.com
        </Typography>
      </FlexBetween>

      <Typography
        color={medium}
        variant="body2"
        lineHeight="1.5"
        textAlign="justify"
      >
        Discover your pathway to stunning and immaculate beauty. Exfoliate,
        refresh, and glow with MikaCosmetics!
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
