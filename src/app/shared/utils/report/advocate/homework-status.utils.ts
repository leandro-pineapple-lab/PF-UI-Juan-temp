export class HomeworkStatusUtils {
  static pendingItemsList: { text: string; value: string }[] = [
    { text: 'Any', value: 'A' },
    { text: '1', value: '1' },
    { text: '2', value: '2' },
    { text: '3', value: '3' },
    { text: '4+', value: '4' },
    { text: '0 or 1', value: 'Y' },
    { text: '1 or 2', value: 'Z' },
    { text: 'Completed', value: 'C' }
  ];

  static statusList: { text: string; value: string }[] = [
    { text: 'All', value: '' },
    { text: 'Bariatric Intake Needed', value: 'BIN' },
    { text: 'Bariatric Intake Pending', value: 'BIP' },
    { text: 'Lab Work Needed', value: 'LWN' },
    { text: 'Lab Work Pending', value: 'LWP' },
    { text: 'Psych Eval Needed', value: 'PEN' },
    { text: 'Psych Eval Pending', value: 'PEP' },
    { text: 'Nutrition Eval Needed', value: 'NTN' },
    { text: 'Nutrition Eval Pending', value: 'NTP' },
    { text: 'Sleep Study Needed', value: 'SSN' },
    { text: 'Sleep Study Pending', value: 'SSP' },
    { text: 'Card. Clearance Needed', value: 'CCN' },
    { text: 'Card. Clearance Pending', value: 'CCP' },
    { text: 'Pulm. Clearance Needed', value: 'PCN' },
    { text: 'Pulm. Clearance Pending', value: 'PCP' },
    { text: 'Med Clearance Needed', value: 'MCN' },
    { text: 'Med. Clearance Pending', value: 'MCP' },
    { text: 'Supervised Diet Needed', value: 'NEN' },
    { text: 'Supervised Diet Pending', value: 'NEP' },
    { text: 'Med. Records Needed', value: 'MRN' },
    { text: 'Med. Records Eval Pending', value: 'MRP' },
    { text: 'Add. Studies Needed', value: 'ASN' },
    { text: 'Add.Studies Pending', value: 'ASP' },
    { text: 'Add. Clearances Needed', value: 'ACN' },
    { text: 'Add. Clearances Pending', value: 'ACP' },
    { text: 'Add. Requirements Needed', value: 'ARN' },
    { text: 'Add. Requirements Pending', value: 'ARP' }
  ];

  static noActivityList: { text: string; value: string }[] = [
    { text: 'All', value: '0' },
    { text: 'in last 2 weeks', value: '14' },
    { text: 'in last month', value: '30' },
    { text: 'in last 2 months', value: '60' },
    { text: 'in last 3 months', value: '90' },
    { text: 'in last 4 months', value: '120' },
    { text: 'in last 5 months', value: '150' },
    { text: 'in last 6 months', value: '182' },
    { text: 'in last 9 months', value: '272' },
    { text: 'in last year', value: '365' },
    { text: 'in last 18 months', value: '547' }
  ];
}
