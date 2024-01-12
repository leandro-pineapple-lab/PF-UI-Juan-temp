const keywords = [
  { name: 'Patient', items: [
    { label: 'First Name', code: '[Patient.FirstName]' },
    { label: 'Last Name', code: '[Patient.LastName]' },
    { label: 'Full Name', code: '[Patient.FullName]' },
    { label: 'DOB', code: '[Patient.DOB]' },
    { label: 'Insurance', code: '[Patient.Insurance]' },
    { label: 'User ID', code: '[Patient.UserID]' },
  ]},
  { name: 'Lead', items: [
    { label: 'First Name', code: '[Lead.FirstName]' },
    { label: 'Last Name', code: '[Lead.LastName]' },
    { label: 'First Initial + Last Name', code: '[Lead.Ini+LastName]' },
  ]},
  { name: 'Seminar', items: [
    { label: 'Title', code: '[Seminar.Title]' },
    { label: 'Presenter', code: '[Seminar.Presenter]' },
    { label: 'Address', code: '[Seminar.Address]' },
    { label: 'Address2', code: '[Seminar.Address2]' },
    { label: 'City', code: '[Seminar.City]' },
    { label: 'State', code: '[Seminar.State]' },
    { label: 'Zip Code', code: '[Seminar.ZipCode]' },
    { label: 'Date', code: '[Seminar.Date]' },
    { label: 'Time', code: '[Seminar.Time]' },
    { label: 'Location', code: '[Seminar.Location]' },
    { label: 'Location Link', code: '[Seminar.LocationLink]' },
  ]},
  { name: 'Professional', items: [
    { label: 'First Name', code: '[Pro.FirstName]' },
    { label: 'Last Name', code: '[Pro.LastName]' },
    { label: 'Full Name', code: '[Pro.FullName]' },
    { label: 'Phone #', code: '[Pro.Phone]' },
    { label: 'E-mail', code: '[Pro.Email]' },
    { label: 'Signature', code: '[Pro.Signature]' },
  ]},
  { name: 'Advocate', items: [
    { label: 'First Name', code: '[Advo.FirstName]' },
    { label: 'Last Name', code: '[Advo.LastName]' },
    { label: 'Full Name', code: '[Advo.FullName]' },
    { label: 'Phone', code: '[Advo.Phone]' },
    { label: 'E-mail', code: '[Advo.Email]' },
    { label: 'Signature', code: '[Advo.Signature]' },
  ]},
  { name: 'Practice', items: [
    { label: 'Name', code: '[Practice.Name]' },
    { label: 'EMail', code: '[Practice.EMail]' },
    { label: 'Address', code: '[Practice.Address]' },
    { label: 'City', code: '[Practice.City]' },
    { label: 'State', code: '[Practice.State]' },
    { label: 'Zip Code', code: '[Practice.ZipCode]' },
    { label: 'Phone', code: '[Practice.Phone]' },
    { label: 'Fax', code: '[Practice.Fax]' },
    { label: 'WebsiteUrl', code: '[Practice.WebsiteUrl]' }
  ]},
  { name: 'PCP', items: [
    { label: 'First Name', code: '[PCP.FirstName]' },
    { label: 'Last Name', code: '[PCP.LastName]' },
    { label: 'Full Name', code: '[PCP.FullName]' },
    { label: 'Phone #', code: '[PCP.Phone]' },
    { label: 'E-mail', code: '[PCP.Email]' },
    { label: 'Fax #', code: '[PCP.Fax]' },
  ]},
  { name: 'Other', items: [
    { label: 'PF Login Url', code: '[PatientFlowURL]' },
    { label: 'Register Url', code: '[RegisterUrl]' },
    { label: "Today's date", code: '[Today.Date]' },
    { label: 'Online Seminar Url', code: '[OnlineSeminarUrl]' },
    { label: 'Newsletter Unsubscribe Url', code: '[NewsletterUnsubscribeUrl]' }
  ]}
];

export default keywords;
