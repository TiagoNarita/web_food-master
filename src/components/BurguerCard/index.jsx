import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const BurguerCard = ({ index, burger, addToCart, onDelete, adm }) => {
  return (
    <div key={index} className="burger-item-cart">
      <Card sx={{ maxWidth: 345 }} key={index}>
        <CardMedia sx={{ height: 140 }} image={burger.image} title="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {burger.title}
          </Typography>
          <Typography
            sx={{ marginTop: 2, color: "#10b981" }}
            gutterBottom
            variant="inherit"
            component="div"
          >
            {burger.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {burger.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button sx={{ color: "#601706" }} onClick={() => addToCart(burger)} size="small">
            Adicionar ao carrinho
          </Button>
          {adm ? (
            <IconButton sx={{ color: "#d32f2f" }} onClick={() => onDelete(burger)} size="small">
              <DeleteIcon />
            </IconButton>
          ) : (
            <></>
          )}
        </CardActions>
      </Card>
    </div>
  );
};
