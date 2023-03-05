import { useContext, useState } from "react"
import { useRouter } from "next/router"
import NextLink from "next/link"
import { CartContext, UiContext } from "@/context"
import {
    AppBar,
    Toolbar,
    Link,
    Typography,
    Button,
    IconButton,
    Box,
    Badge,
    Input,
    InputAdornment,
} from "@mui/material"
import {
    ClearOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@mui/icons-material"

export const Navbar = () => {
    const router = useRouter()
    const { toogleSideMenu } = useContext(UiContext)

    const { numberOfItems } = useContext(CartContext)

    const [searchTerm, setSearchTerm] = useState("")

    const [isSearchVisible, setIsSearchVisible] = useState(false)

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return
        router.push(`/search/${searchTerm}`)
    }

    return (
        <AppBar>
            <Toolbar>
                <NextLink href="/" passHref legacyBehavior>
                    <Link display="flex" alignItems="center">
                        <Typography variant="h6">Teslo</Typography>
                        <Typography sx={{ marginLeft: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>

                <Box sx={{ flex: 1 }}></Box>

                <Box
                    sx={{
                        display: isSearchVisible
                            ? "none"
                            : { xs: "none", sm: "block" },
                    }}
                    className="fadeIn"
                >
                    <NextLink href="/category/men" passHref legacyBehavior>
                        <Link>
                            <Button
                                color={
                                    router.route === "/category/men"
                                        ? "primary"
                                        : "info"
                                }
                            >
                                Hombres
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href="/category/women" passHref legacyBehavior>
                        <Link>
                            <Button
                                color={
                                    router.route === "/category/women"
                                        ? "primary"
                                        : "info"
                                }
                            >
                                Mujeres
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href="/category/kids" passHref legacyBehavior>
                        <Link>
                            <Button
                                color={
                                    router.route === "/category/kids"
                                        ? "primary"
                                        : "info"
                                }
                            >
                                Niños
                            </Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box sx={{ flex: 1 }}></Box>

                {/* Pantallas grandes */}
                {isSearchVisible ? (
                    <Input
                        sx={{ display: { xs: "none", sm: "flex" } }}
                        className="fadeIn"
                        autoFocus
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) =>
                            e.key === "Enter" ? onSearchTerm() : null
                        }
                        type="text"
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setIsSearchVisible(false)}
                                >
                                    <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                ) : (
                    <IconButton
                        onClick={() => setIsSearchVisible(true)}
                        className="fadeIn"
                        sx={{ display: { xs: "none", sm: "flex" } }}
                    >
                        <SearchOutlined />
                    </IconButton>
                )}

                {/* Pantallas pequeñas */}
                <IconButton
                    sx={{ display: { xs: "flex", sm: "none" } }}
                    onClick={toogleSideMenu}
                >
                    <SearchOutlined />
                </IconButton>

                <NextLink href="/cart" passHref legacyBehavior>
                    <Link>
                        <IconButton>
                            <Badge
                                badgeContent={
                                    numberOfItems > 9 ? "+9" : numberOfItems
                                }
                                color="secondary"
                            >
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button onClick={toogleSideMenu}>Menú</Button>
            </Toolbar>
        </AppBar>
    )
}
