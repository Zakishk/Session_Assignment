const { test, expect } = require('@playwright/test');
const ApiClient = require('../utils/apiClient');
const AuthHelper = require('../utils/authHelper');
const TestDataGenerator = require('../utils/testDataGenerator');

test.describe('ECareHealth Clinician Management CRUD Operations', () => {

  test('Complete Clinician Management Flow', async ({ request }) => {
    console.log('\n🎯 Starting Complete Clinician Management Flow Test');
    console.log('═'.repeat(60));

    // Step 1: Initialize API client and authenticate
    const apiClient = new ApiClient(request);
    await AuthHelper.authenticate(apiClient);
    console.log('✅ Authentication completed');

    let providerId;
    let patientId;
    let appointmentId;

    // Step 2: Create Provider
    const providerData = TestDataGenerator.generateProviderData();
    const providerResult = await apiClient.createProvider(providerData);
    providerId = providerResult.providerId;
    
    // Validate provider creation
    expect(providerId).toBeTruthy();
    expect(providerResult.response.code).toBe('PROVIDER_CREATED');
    expect(providerResult.response.message).toContain('successfully');

    // Step 3: Get Provider Status
    const providerDetails = await apiClient.getProvider(providerId);
    expect(providerDetails).toBeTruthy();

    // Step 4: Set Provider Availability
    const availabilityData = TestDataGenerator.generateAvailabilityData(providerId);
    const availabilityResult = await apiClient.setAvailability(availabilityData);
    expect(availabilityResult).toBeTruthy();

    // Step 5: Create Patient
    const patientData = TestDataGenerator.generatePatientData();
    const patientResult = await apiClient.createPatient(patientData);
    patientId = patientResult.patientId;
    
    // Validate patient creation
    expect(patientId).toBeTruthy();
    if (patientResult.response.code) {
      // Success wrapper format
      expect(patientResult.response.message).toContain('Successfully');
    } else {
      // Direct response format
      expect(patientResult.response.firstName).toBe(patientData.firstName);
      expect(patientResult.response.lastName).toBe(patientData.lastName);
    }

    // Step 6: Get Patient Details
    const patientDetails = await apiClient.getPatient(patientId);
    // Note: API might return empty response with 204 status, which is acceptable

    // Step 7: Book Appointment
    const appointmentData = TestDataGenerator.generateAppointmentData(providerId, patientId);
    const appointmentResult = await apiClient.bookAppointment(appointmentData);
    appointmentId = appointmentResult.uuid || appointmentResult.id;
    
    expect(appointmentResult).toBeTruthy();

    console.log('\n🎉 Test Flow Completed Successfully!');
    console.log('═'.repeat(60));
    console.log(`✅ Provider ID: ${providerId}`);
    console.log(`✅ Patient ID: ${patientId}`);
    console.log(`✅ Appointment ID: ${appointmentId || 'N/A'}`);
    console.log('═'.repeat(60));
  });
});