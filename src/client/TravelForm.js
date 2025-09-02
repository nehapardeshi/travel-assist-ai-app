import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from 'react-router-dom'

const steps = [
  "No of days & Location",
  "Group Info",
  "Travel Mode",
  "Interests",
  "Food Preferences",
  "Review & Confirm",
];

function TravelForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    noOfDays: "",
    tripLocation: "",
    travellersCount: "",
    withKids: false,
    kidsAge: "",
    travelMode: "",
    interests: [],
    foodPreferences: [],
    withStroller: false//,
    //areaPreference: ""/,
    //dayTrips: [],
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "interests") {
      setFormData((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((item) => item !== value),
      }));
    } else if (type === "checkbox" && name === "foodPreferences") {
      setFormData((prev) => ({
        ...prev,
        foodPreferences: checked
          ? [...prev.foodPreferences, value]
          : prev.foodPreferences.filter((item) => item !== value),
      }));
    // } else if (type === "checkbox" && name === "withKids") {
    //   setFormData((prev) => ({
    //     ...prev,
    //     dayTrips: checked
    //       ? [...prev.dayTrips, value]
    //       : prev.dayTrips.filter((item) => item !== value),
    //   }));
    } else if (type === "checkbox" && name === "withStroller") {
      setFormData((prev) => ({
        ...prev,
        withStroller: checked,
      }));
    } else if (type === "checkbox" && name === "withKids") {
      setFormData((prev) => ({
        ...prev,
        withKids: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // clear error when user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = () => {
    let stepErrors = {};

    if (step === 0) {
      if (!formData.noOfDays.trim()) {
        stepErrors.noOfDays = "Travel dates are required";
      }
      if (!formData.tripLocation.trim()) {
        stepErrors.tripLocation = "Location is required";
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();    
    navigate('./summary', { state: formData }) // ✅ pass formData as state
  };

  // ----- Step Content -----
  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Box>
            <TextField
              label={
                <span>
                  Number of trip days <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="noOfDays"
              value={formData.noOfDays}
              onChange={handleChange}
              fullWidth
              margin="normal"
              placeholder="e.g. 10"
              error={!!errors.noOfDays}
              helperText={errors.noOfDays}
            />
            <TextField
              label={
                <span>
                  Travel Location/City <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="tripLocation"
              value={formData.tripLocation}
              onChange={handleChange}
              fullWidth
              margin="normal"
              placeholder="e.g. Paris, France"
              error={!!errors.tripLocation}
              helperText={errors.tripLocation}
            />
          </Box>
        );

      case 1:
        return (
          <Box>
            <TextField
              label="How many people are in your group?"
              name="travellersCount"
              value={formData.travellersCount}
              onChange={handleChange}
              fullWidth
              margin="normal"
              placeholder="e.g. Family, Friends"
            />
            <FormControlLabel              
              control={
                <Checkbox
                  name="withKids"
                  checked={formData.withKids}
                  onChange={handleChange}
                />
              }
              label="Do you have kids with you?"
            />
            <TextField
              label="Kids Age"
              name="kidsAge"
              value={formData.kidsAge}
              onChange={handleChange}
              fullWidth
              margin="normal"
              placeholder="e.g. 5, 8"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="withStroller"
                  checked={formData.withStroller}
                  onChange={handleChange}
                />
              }
              label="Carrying child stroller?"
            />
          </Box>
        );

      case 2:
        return (
          <Box>
            <FormControl fullWidth margin="normal">
              <InputLabel>Travel Mode</InputLabel>
              <Select
                name="travelMode"
                value={formData.travelMode}
                onChange={handleChange}
              >
                <MenuItem value="car">Car</MenuItem>
                <MenuItem value="public">Public Transport</MenuItem>                
                <MenuItem value="cycle">Cycle</MenuItem>
              </Select>
            </FormControl>

            {/* <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Day Trips
            </Typography>
            <FormGroup row>
              {["Car", "Public Transport", "Cycle"].map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      name="dayTrips"
                      value={item}
                      checked={formData.dayTrips.includes(item)}
                      onChange={handleChange}
                    />
                  }
                  label={item}
                />
              ))}
            </FormGroup> */}
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="subtitle1">Places of Interest</Typography>
            <FormGroup row>
              {[
                "Hiking",
                "Museums",
                "Churches",
                "History",
                "Forts",
                "Castles",
                "Adventure Parks",
                "Gardens/Parks"
              ].map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      name="interests"
                      value={item}
                      checked={formData.interests.includes(item)}
                      onChange={handleChange}
                    />
                  }
                  label={item}
                />
              ))}
            </FormGroup>

            {/* <FormControl fullWidth margin="normal">
              <InputLabel>Area Preference</InputLabel>
              <Select
                name="areaPreference"
                value={formData.areaPreference}
                onChange={handleChange}
              >
                <MenuItem value="city">Inside City</MenuItem>
                <MenuItem value="countryside">Countryside</MenuItem>
              </Select>
            </FormControl> */}
          </Box>
        );

      case 4:
        return (
          <Box>
            <Typography variant="subtitle1">Food Preferences</Typography>
            <FormGroup row>
              {[
                "Fine Dining",
                "Normal Restaurant",
                "Fast Food",
                "Home-packed",
              ].map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      name="foodPreferences"
                      value={item}
                      checked={formData.foodPreferences.includes(item)}
                      onChange={handleChange}
                    />
                  }
                  label={item}
                />
              ))}
            </FormGroup>
          </Box>
        );

      case 5:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Trip Plan
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="No of trip days"
                  secondary={formData.noOfDays || "Not provided"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Location"
                  secondary={formData.tripLocation || "Not provided"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="No of Travellers"
                  secondary={formData.travellersCount || "Not provided"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Kids Age"
                  secondary={formData.kidsAge || "None"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="With Stroller"
                  secondary={formData.withStroller ? "Yes" : "No"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Travel Mode"
                  secondary={formData.travelMode || "Not selected"}
                />
              </ListItem>
              {/* <ListItem>
                <ListItemText
                  primary="Day Trips"
                  secondary={formData.dayTrips.join(", ") || "None"}
                />
              </ListItem> */}
              <ListItem>
                <ListItemText
                  primary="Places of Interests"
                  secondary={formData.interests.join(", ") || "None"}
                />
              </ListItem>
              {/* <ListItem>
                <ListItemText
                  primary="Area Preference"
                  secondary={formData.areaPreference || "Not selected"}
                />
              </ListItem> */}
              <ListItem>
                <ListItemText
                  primary="Food Preferences"
                  secondary={formData.foodPreferences.join(", ") || "None"}
                />
              </ListItem>
            </List>
          </Box>
        );

      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <Box sx={{ maxWidth: 700, margin: "auto", padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Plan Your Trip
      </Typography>

      {/* Stepper */}
        <Stepper activeStep={step} alternativeLabel>
        {steps.map((label, index) => (
            <Step key={label}>
            <StepLabel
                onClick={() => {
                // Only allow clicking to previous or current steps
                if (index <= step) {
                    setStep(index);
                }
                }}
                style={{ cursor: index <= step ? "pointer" : "default" }}
            >
                {label}
            </StepLabel>
            </Step>
        ))}
        </Stepper>


      {/* Step Content */}
      <Box sx={{ marginTop: 4 }}>{renderStepContent(step)}</Box>

      {/* Navigation */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}
      >
        <Button disabled={step === 0} onClick={prevStep} variant="outlined">
          Back
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={nextStep} variant="contained">
            Next
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Plan my trip
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default TravelForm;
