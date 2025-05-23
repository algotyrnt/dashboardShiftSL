import "../Components/AddEmployee.tsx"
import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Grid, IconButton,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Tooltip,
    Typography
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "../CSS/Employees.css";
import AddEmployee from "../Components/AddEmployee.tsx";
import {userApi} from "../service/api.ts";
import {User, UserDTO} from "../types/user.ts";
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

const Employees: React.FC = () => {
    const [doctors, setDoctors] = useState<User[]>([]);
    const [admins, setAdmins] = useState<User[]>([]);
    const [addForm, setAddForm] = useState(false);
    const [activeTab, setActiveTab] = useState<'members' | 'admins'>('members');
    const [editUser, setEditUser] = useState<User| null>(null);
    const {currentUser} = useAuth();

    useEffect(() => {
        ( async () => {
            try {
                console.log(currentUser?.firstName+" "+currentUser?.lastName+" "+currentUser?.role);
                const response = await userApi.getAllUsers();
                const filteredDoctors = response.data.filter(
                    (user: User) =>
                        user.role === "DOCTOR_PERM" || user.role === "DOCTOR_TEMP"
                );
                setDoctors(filteredDoctors);

                const filteredAdmins = response.data.filter(
                    (user: User) =>
                        user.role === "HR_ADMIN" || user.role === "WARD_ADMIN"
                );
                setAdmins(filteredAdmins);
                console.log(response.data);
            } catch (error) {
                console.error("Error Fetching Users", error);
            }
        })
        ();
    }, []);
    const isHRAdmin = ()=> {
        return currentUser?.role === "HR_ADMIN";
    }

    const handleDoctorAdded = async (newDoctor: UserDTO) => {
        try {
            setEditUser(null);
            const response = await userApi.saveUser(newDoctor);
            const savedDoctor = response.data;

            // Add the new user to the appropriate list based on their role
            if (savedDoctor.role === "DOCTOR_PERM" || savedDoctor.role === "DOCTOR_TEMP") {
                const updatedDoctors = [...doctors, savedDoctor];
                setDoctors(updatedDoctors);
            } else if (savedDoctor.role === "HR_ADMIN" || savedDoctor.role === "WARD_ADMIN") {
                const updatedAdmins = [...admins, savedDoctor];
                setAdmins(updatedAdmins);
            }

            setAddForm(false);
            console.log("New User Added:", savedDoctor);
        } catch (e) {
            console.error("Error Adding User", e);
        }
    }

    const updateUserAdded = async (user: User) =>{
        setEditUser(user);
        setAddForm(true);
    }
    const deleteUser = async (id: number)=>{
        try{
            const response =   await userApi.deleteUser(id);
            console.log(response);
        }catch (error){
            console.log("Error Deleting User ", error)
        }
    }
    const displayedUsers = activeTab === 'members' ? doctors : admins;

    return (
        <Box sx={{ width: "100%", padding: "20px" }}>
            <Grid container alignItems="center" spacing={1} className="heading">
                <Grid item>
                    <Typography variant="h5" fontWeight="bold">
                        Employees
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography variant="h6">
                        {activeTab === 'members' ? "Doctor's List" : "Admins List"}
                    </Typography>
                </Grid>
            </Grid>

            <Box className="panel" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "20px" }}>
                {/* Left Section with Tabs */}
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        className="panel-btn"
                        sx={{
                            color: "#2AED8D",
                            borderColor: "#2AED8D",
                            backgroundColor: activeTab === 'members' ? "#2AED8D !important" : "transparent !important",
                            "&:hover": {
                                backgroundColor: "#28C77F!important",
                            },
                        }}
                        onClick={() => setActiveTab('members')}
                    >
                        Members
                    </Button>

                    <Button
                        className="panel-btn"
                        sx={{
                            color: "#2AED8D",
                            borderColor: "#2AED8D",
                            backgroundColor: activeTab === 'admins' ? "#2AED8D !important" : "transparent !important",
                            "&:hover": {
                                backgroundColor: "#28C77F!important",
                            },
                        }}
                        onClick={() => setActiveTab('admins')}
                    >
                        Admins
                    </Button>
                </Box>

                {/* Right Section - Add & Filter */}
                {isHRAdmin() &&(
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<AddCircleOutlineIcon />}
                            className="panel-btn"
                            sx={{
                                color: "#2AED8D",
                                borderColor: "#2AED8D",
                                backgroundColor: "#2AED8D !important",
                                "&:hover": {
                                    backgroundColor: "#28C77F!important",
                                },
                            }}
                            onClick={() => {setAddForm(true); setEditUser(null);}}
                        >
                            Add New
                        </Button>

                        <Modal open={addForm} onClose={() => {setAddForm(false); setEditUser(null);}}>
                            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", p: 3, borderRadius: 2 }}>
                                <AddEmployee onDoctorAdded={handleDoctorAdded} existingDoctor={editUser} />
                            </Box>
                        </Modal>
                    </Box>)}
                    </Box>





            <Box className="List" sx={{ padding: "20px", width: "100%" }}>
                <TableContainer sx={{ maxWidth: "100%" }}>
                    <Table size="medium">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell sx={{ fontWeight: "bold", fontSize: "14px", padding: "20px" }}>First Name</TableCell>
                                <TableCell sx={{ fontWeight: "bold", fontSize: "14px", padding: "20px" }}>Last Name</TableCell>
                                <TableCell sx={{ fontWeight: "bold", fontSize: "14px", padding: "20px" }}>Mobile</TableCell>
                                <TableCell sx={{ fontWeight: "bold", fontSize: "14px", padding: "20px" }}>SLMC RegNo</TableCell>
                                <TableCell sx={{ fontWeight: "bold", fontSize: "14px", padding: "20px" }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: "bold", fontSize: "14px", padding: "20px" }}>Status</TableCell>
                                {isHRAdmin() && (<TableCell sx={{ fontWeight: "bold", fontSize: "14px", padding: "20px" }}>Action</TableCell>)}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedUsers.map((user) => (
                                <TableRow sx={{ backgroundColor: "#FDFDFD" }} key={user.id} >
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.phoneNo}</TableCell>
                                    <TableCell>{user.slmcReg}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    {isHRAdmin() && (<TableCell>
                                        <Tooltip title="Edit">
                                            <IconButton onClick={() => updateUserAdded(user)}>
                                                <EditIcon color="primary" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={()=> deleteUser(user.id)}>
                                                <DeleteIcon color="primary"  />
                                            </IconButton>
                                        </Tooltip>

                                    </TableCell>)}

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default Employees;