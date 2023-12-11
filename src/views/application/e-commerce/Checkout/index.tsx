import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { styled, Theme, useTheme } from '@mui/material/styles';
import { Grid, Tab, Tabs, Typography } from '@mui/material';

// project imports
import CartEmpty from './CartEmpty';
import Cart from './Cart';
import BillingAddress from './BillingAddress';
import Payment from './Payment';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'utils/axios';
import {
    BACK_STEP,
    NEXT_STEP,
    REMOVE_PRODUCT,
    SET_STEP,
    SNACKBAR_OPEN,
    UPDATE_QUANTITY,
    SET_BILLING_ADDRESS,
    SET_SHIPPING_CHARGE
} from 'store/actions';
import { gridSpacing } from 'store/constant';
import { CustomizationStateProps, DefaultRootStateProps } from 'types';
import { CartStateProps } from 'types/cart';
import { Address } from '../types';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';

interface StyledProps {
    theme: Theme;
    customization: CustomizationStateProps;
    value: number;
    cart: CartStateProps;
    disabled?: boolean;
    icon?: React.ReactNode;
    label?: React.ReactNode;
}

interface TabOptionProps {
    label: string;
    icon: React.ReactNode;
    caption: string;
}

const StyledTab = styled((props) => <Tab {...props} />)(({ theme, customization, value, cart, ...others }: StyledProps) => ({
    color: cart.checkout.step >= value ? theme.palette.success.dark : theme.palette.grey[600],
    minHeight: 'auto',
    minWidth: 250,
    padding: 16,
    borderRadius: `${customization.borderRadius}px`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    textAlign: 'left',
    justifyContent: 'flex-start',
    '&:after': {
        backgroundColor: 'transparent !important'
    },
    '&.Mui-selected': {
        color: theme.palette.primary.main,
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
    },
    '& > svg': {
        marginBottom: '0px !important',
        marginRight: 10,
        marginTop: 2,
        height: 20,
        width: 20
    },
    [theme.breakpoints.down('md')]: {
        minWidth: '100%'
    }
}));

// tabs option
const tabsOption: TabOptionProps[] = [
    {
        label: 'User Profile',
        icon: <ShoppingCartTwoToneIcon />,
        caption: 'Product Added'
    },
    {
        label: 'Billing Address',
        icon: <ApartmentIcon />,
        caption: 'Billing Information'
    },
    {
        label: 'Payment',
        icon: <CreditCardTwoToneIcon />,
        caption: 'Add & Update Card'
    }
];

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

// tabs
function TabPanel({ children, value, index, ...other }: TabPanelProps) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <div>{children}</div>}
        </div>
    );
}

// ==============================|| PRODUCT - CHECKOUT MAIN ||============================== //

const Checkout = () => {
    const theme = useTheme();
    const customization = useSelector((state: DefaultRootStateProps) => state.customization);
    const cart = useSelector((state: DefaultRootStateProps) => state.cart);
    const dispatch = useDispatch();

    const isCart = cart.checkout.products && cart.checkout.products.length > 0;

    const [value, setValue] = React.useState(cart.checkout.step > 2 ? 2 : cart.checkout.step);
    const [billing, setBilling] = React.useState(cart.checkout.billing);
    const [address, setAddress] = React.useState<Address[]>([]);

    const getAddress = async () => {
        const response = await axios.get('/api/address/list');
        setAddress(response.data.address);
    };

    React.useEffect(() => {
        getAddress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addAddress = async (addressNew: Address) => {
        const response = await axios.post('/api/address/new', {
            data: addressNew
        });
        setAddress(response.data.address);
    };

    const editAddress = async (addressEdit: Address) => {
        const response = await axios.post('/api/address/edit', {
            data: addressEdit
        });
        setAddress(response.data.address);
    };

    const handleChange = (newValue: number) => {
        setValue(newValue);
        dispatch({ type: SET_STEP, step: newValue });
    };

    React.useEffect(() => {
        setValue(cart.checkout.step > 2 ? 2 : cart.checkout.step);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart.checkout.step]);

    const removeProduct = (id: string | number | undefined) => {
        dispatch({ type: REMOVE_PRODUCT, id });
        dispatch({
            type: SNACKBAR_OPEN,
            open: true,
            message: 'Update Cart Success',
            variant: 'alert',
            alertSeverity: 'success'
        });
    };

    const updateQuantity = (id: string | number | undefined, quantity: number) => {
        dispatch({ type: UPDATE_QUANTITY, id, quantity });
    };

    const onNext = () => {
        dispatch({ type: NEXT_STEP });
    };

    const onBack = () => {
        dispatch({ type: BACK_STEP });
    };

    const billingAddressHandler = (addressBilling: Address | null) => {
        if (billing !== null || addressBilling !== null) {
            if (addressBilling !== null) {
                setBilling(addressBilling);
            }

            dispatch({ type: SET_BILLING_ADDRESS, address: addressBilling !== null ? addressBilling : billing });
            onNext();
        } else {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Please select delivery address',
                variant: 'alert',
                alertSeverity: 'error'
            });
        }
    };

    const handleShippingCharge = (type: string) => {
        dispatch({ type: SET_SHIPPING_CHARGE, charge: type });
    };

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Tabs
                        value={value}
                        onChange={(e, newValue) => handleChange(newValue)}
                        aria-label="icon label tabs example"
                        variant="scrollable"
                        sx={{
                            '& .MuiTabs-flexContainer': {
                                borderBottom: 'none'
                            },
                            '& .MuiTabs-indicator': {
                                display: 'none'
                            },
                            '& .MuiButtonBase-root + .MuiButtonBase-root': {
                                position: 'relative',
                                overflow: 'visible',
                                ml: 2,
                                '&:after': {
                                    content: '""',
                                    bgcolor: '#ccc',
                                    width: 1,
                                    height: 'calc(100% - 16px)',
                                    position: 'absolute',
                                    top: 8,
                                    left: -8
                                }
                            }
                        }}
                    >
                        {tabsOption.map((tab, index) => (
                            <StyledTab
                                theme={theme}
                                customization={customization}
                                value={index}
                                cart={cart}
                                disabled={index > cart.checkout.step}
                                key={index}
                                icon={tab.icon}
                                label={
                                    <Grid container direction="column">
                                        <Typography variant="subtitle1" color="inherit">
                                            {tab.label}
                                        </Typography>
                                        <Typography component="div" variant="caption" sx={{ textTransform: 'capitalize' }}>
                                            {tab.caption}
                                        </Typography>
                                    </Grid>
                                }
                            />
                        ))}
                    </Tabs>
                </Grid>
                <Grid item xs={12}>
                    <TabPanel value={value} index={0}>
                        {isCart && (
                            <Cart checkout={cart.checkout} onNext={onNext} removeProduct={removeProduct} updateQuantity={updateQuantity} />
                        )}
                        {!isCart && <CartEmpty />}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <BillingAddress
                            checkout={cart.checkout}
                            onBack={onBack}
                            billingAddressHandler={billingAddressHandler}
                            address={address}
                            addAddress={addAddress}
                            editAddress={editAddress}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Payment checkout={cart.checkout} onBack={onBack} onNext={onNext} handleShippingCharge={handleShippingCharge} />
                    </TabPanel>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Checkout;
