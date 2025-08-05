class TestDataGenerator {
  static generateProviderData() {
    const timestamp = Date.now();
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `test.provider.${timestamp}@medarch.com`;
    
    return {
      "roleType": "PROVIDER",
      "active": false,
      "admin_access": true,
      "status": false,
      "avatar": "",
      "role": "PROVIDER",
      "firstName": firstName,
      "lastName": lastName,
      "gender": Math.random() > 0.5 ? "MALE" : "FEMALE",
      "phone": "",
      "npi": "",
      "specialities": null,
      "groupNpiNumber": "",
      "licensedStates": null,
      "licenseNumber": "",
      "acceptedInsurances": null,
      "experience": "",
      "taxonomyNumber": "",
      "workLocations": null,
      "email": email,
      "officeFaxNumber": "",
      "areaFocus": "",
      "hospitalAffiliation": "",
      "ageGroupSeen": null,
      "spokenLanguages": null,
      "providerEmployment": "",
      "insurance_verification": "",
      "prior_authorization": "",
      "secondOpinion": "",
      "careService": null,
      "bio": "",
      "expertise": "",
      "workExperience": "",
      "licenceInformation": [
        {
          "uuid": "",
          "licenseState": "",
          "licenseNumber": ""
        }
      ],
      "deaInformation": [
        {
          "deaState": "",
          "deaNumber": "",
          "deaTermDate": "",
          "deaActiveDate": ""
        }
      ]
    };
  }

  static generatePatientData() {
    const timestamp = Date.now();
    const firstNames = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery'];
    const lastNames = ['Peterson', 'Anderson', 'Thompson', 'Martinez', 'Robinson', 'Clark', 'Lewis', 'Walker'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    // Generate a birth date between 1950 and 2000
    const startDate = new Date('1950-01-01').getTime();
    const endDate = new Date('2000-12-31').getTime();
    const randomTime = startDate + Math.random() * (endDate - startDate);
    const birthDate = new Date(randomTime).toISOString();
    
    return {
      "phoneNotAvailable": true,
      "emailNotAvailable": true,
      "registrationDate": "",
      "firstName": firstName,
      "middleName": "",
      "lastName": lastName,
      "timezone": "IST",
      "birthDate": birthDate,
      "gender": Math.random() > 0.5 ? "MALE" : "FEMALE",
      "ssn": "",
      "mrn": "",
      "languages": null,
      "avatar": "",
      "mobileNumber": "",
      "faxNumber": "",
      "homePhone": "",
      "address": {
        "line1": "",
        "line2": "",
        "city": "",
        "state": "",
        "country": "",
        "zipcode": ""
      },
      "emergencyContacts": [
        {
          "firstName": "",
          "lastName": "",
          "mobile": ""
        }
      ],
      "patientInsurances": [
        {
          "active": true,
          "insuranceId": "",
          "copayType": "FIXED",
          "coInsurance": "",
          "claimNumber": "",
          "note": "",
          "deductibleAmount": "",
          "employerName": "",
          "employerAddress": {
            "line1": "",
            "line2": "",
            "city": "",
            "state": "",
            "country": "",
            "zipcode": ""
          },
          "subscriberFirstName": "",
          "subscriberLastName": "",
          "subscriberMiddleName": "",
          "subscriberSsn": "",
          "subscriberMobileNumber": "",
          "subscriberAddress": {
            "line1": "",
            "line2": "",
            "city": "",
            "state": "",
            "country": "",
            "zipcode": ""
          },
          "groupId": "",
          "memberId": "",
          "groupName": "",
          "frontPhoto": "",
          "backPhoto": "",
          "insuredFirstName": "",
          "insuredLastName": "",
          "address": {
            "line1": "",
            "line2": "",
            "city": "",
            "state": "",
            "country": "",
            "zipcode": ""
          },
          "insuredBirthDate": "",
          "coPay": "",
          "insurancePayer": {}
        }
      ],
      "emailConsent": false,
      "messageConsent": false,
      "callConsent": false,
      "patientConsentEntities": [
        {
          "signedDate": new Date().toISOString()
        }
      ]
    };
  }

  static generateAvailabilityData(providerId) {
    return {
      "setToWeekdays": false,
      "providerId": providerId,
      "bookingWindow": "3",
      "timezone": "EST",
      "bufferTime": 0,
      "initialConsultTime": 0,
      "followupConsultTime": 0,
      "settings": [
        {
          "type": "NEW",
          "slotTime": "30",
          "minNoticeUnit": "8_HOUR"
        }
      ],
      "blockDays": [],
      "daySlots": [
        {
          "day": "MONDAY",
          "startTime": "12:00:00",
          "endTime": "13:00:00",
          "availabilityMode": "VIRTUAL"
        },
        {
          "day": "TUESDAY",
          "startTime": "12:00:00",
          "endTime": "13:00:00",
          "availabilityMode": "VIRTUAL"
        },
        {
          "day": "WEDNESDAY",
          "startTime": "12:00:00",
          "endTime": "13:00:00",
          "availabilityMode": "VIRTUAL"
        },
        {
          "day": "THURSDAY",
          "startTime": "12:00:00",
          "endTime": "13:00:00",
          "availabilityMode": "VIRTUAL"
        },
        {
          "day": "FRIDAY",
          "startTime": "12:00:00",
          "endTime": "13:00:00",
          "availabilityMode": "VIRTUAL"
        }
      ],
      "bookBefore": "undefined undefined",
      "xTENANTID": "stage_aithinkitive"
    };
  }

  static generateAppointmentData(providerId, patientId) {
    // Find the next weekday (Monday-Friday) since provider availability is set for weekdays only
    const now = new Date();
    let appointmentDate = new Date(now);
    
    // Add at least 1 day to ensure it's in the future
    appointmentDate.setDate(appointmentDate.getDate() + 1);
    
    // Find next weekday (Monday=1, Tuesday=2, ..., Friday=5)
    while (appointmentDate.getDay() === 0 || appointmentDate.getDay() === 6) {
      appointmentDate.setDate(appointmentDate.getDate() + 1);
    }
    
    // Set appointment time to match provider availability (12:00 PM EST)
    // Provider availability is 12:00:00 to 13:00:00 in EST
    // We need to convert EST to UTC for the API call
    
    // EST is UTC-5, so 12:00 EST = 17:00 UTC
    // But we need to be careful about daylight saving time
    // For simplicity, let's use 12:00 in the provider's timezone
    
    const year = appointmentDate.getFullYear();
    const month = appointmentDate.getMonth();
    const day = appointmentDate.getDate();
    
    // Create appointment at 12:00 PM EST (which is 17:00 UTC in standard time)
    // But let's use the same timezone approach as the availability setting
    const startTime = new Date(year, month, day, 17, 0, 0, 0); // 17:00 UTC = 12:00 EST
    const endTime = new Date(year, month, day, 17, 30, 0, 0);   // 17:30 UTC = 12:30 EST
    
    // Alternative approach - let's match the exact format and timing from availability
    // Since availability is set for 12:00:00 to 13:00:00 EST, let's book at exactly 12:00 EST
    
    const complaints = [
      "Routine checkup and consultation",
      "Follow-up appointment for ongoing treatment", 
      "General health assessment",
      "Preventive care consultation",
      "Health screening appointment"
    ];
    
    const complaint = complaints[Math.floor(Math.random() * complaints.length)];
    
    // Let's try a different approach - use the same day of week that has availability
    // and ensure the time matches exactly
    const nextMonday = this.getNextWeekday(now, 1); // Get next Monday
    
    // Set time to 12:00 PM in EST timezone
    // For EST (UTC-5), 12:00 PM EST = 17:00 UTC
    const appointmentStart = new Date(nextMonday);
    appointmentStart.setUTCHours(17, 0, 0, 0); // 17:00 UTC = 12:00 EST
    
    const appointmentEnd = new Date(appointmentStart);
    appointmentEnd.setUTCMinutes(30); // 30 minutes later
    
    console.log(`📅 Scheduling appointment for: ${appointmentStart.toISOString()}`);
    console.log(`📅 Day of week: ${appointmentStart.getUTCDay()} (1=Monday, 2=Tuesday, etc.)`);
    console.log(`📅 UTC Time: ${appointmentStart.getUTCHours()}:${appointmentStart.getUTCMinutes().toString().padStart(2, '0')}`);
    console.log(`📅 EST Time: ${appointmentStart.getUTCHours() - 5}:${appointmentStart.getUTCMinutes().toString().padStart(2, '0')}`);
    
    return {
      "mode": "VIRTUAL",
      "patientId": patientId,
      "customForms": null,
      "visit_type": "",
      "type": "NEW",
      "paymentType": "CASH",
      "providerId": providerId,
      "startTime": appointmentStart.toISOString(),
      "endTime": appointmentEnd.toISOString(),
      "insurance_type": "",
      "note": "",
      "authorization": "",
      "forms": [],
      "chiefComplaint": `Automated test: ${complaint}`,
      "isRecurring": false,
      "recurringFrequency": "daily",
      "reminder_set": false,
      "endType": "never",
      "endDate": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      "endAfter": 5,
      "customFrequency": 1,
      "customFrequencyUnit": "days",
      "selectedWeekdays": [],
      "reminder_before_number": 1,
      "timezone": "EST", // Match the provider's availability timezone
      "duration": 30,
      "xTENANTID": "stage_aithinkitive"
    };
  }
  
  // Helper method to get next occurrence of a specific weekday
  static getNextWeekday(date, targetDay) {
    // targetDay: 1=Monday, 2=Tuesday, ..., 7=Sunday
    const currentDay = date.getDay() === 0 ? 7 : date.getDay(); // Convert Sunday from 0 to 7
    const daysUntilTarget = targetDay > currentDay ? 
      targetDay - currentDay : 
      7 - currentDay + targetDay;
    
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + daysUntilTarget);
    return nextDate;
  }
}

module.exports = TestDataGenerator;