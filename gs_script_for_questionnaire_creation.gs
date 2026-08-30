function createInfosys704Form() {
  const title = 'INFOSYS 704 A1-D2 – Organisational Interview';
  const form = FormApp.create(title, false);

  const description = [
    'Thank you for contributing to this INFOSYS 704 consulting assignment. This form should take approximately 10–12 minutes.',
    '',
    'This interview focuses on how DPE New Zealand could manage serious and sustained underperformance across its franchise network. Publicly available DPE information describes ongoing franchise support through Franchise Consultants and Market Managers, while underperforming stores may require turnaround, refranchising, transfer or closure.',
    '',
    'We are interested specifically in the organisational side of the problem—how responsibilities, information, decisions, coordination and support work when a store requires formal management attention. You are not expected to know confidential DPE procedures. Where actual internal practice is not known, please answer from the DPE context provided and your professional judgement. There are no correct answers.',
    '',
    'Definition used in this form: “Serious underperformance” means sustained store-performance problems significant enough for DPE to review the store formally and decide whether recovery support or another course of action is required.'
  ].join('\n');

  form
    .setDescription(description)
    // No visible section/page-break headings are used because they add little value for respondents.
    .setProgressBar(false)
    .setShuffleQuestions(false)
    .setCollectEmail(false)
    .setLimitOneResponsePerUser(false)
    .setAllowResponseEdits(false)
    .setShowLinkToRespondAgain(false)
    .setPublishingSummary(false)
    .setConfirmationMessage(
      'Thank you for your time. Your responses will be used only for this INFOSYS 704 assignment to compare stakeholder perspectives, test the selected organisational hypothesis and identify whether another explanation should be investigated.'
    );

  // Create and link a response spreadsheet.
  const responseSheet = SpreadsheetApp.create('INFOSYS 704 A1-D2 – Interview Responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, responseSheet.getId());

  // Respondent identification
  form.addTextItem()
    .setTitle('Please enter your name')
    .setHelpText('This is used only to identify whose response has been submitted for the INFOSYS 704 assignment.')
    .setRequired(true);

  // Q1 – Overall organisational challenge
  form.addParagraphTextItem()
    .setTitle('Q1. From an organisational perspective, what do you see as the hardest challenge for DPE when a franchise store has been seriously underperforming for some time?')
    .setRequired(true);

  // Q2 – Expected management response
  form.addParagraphTextItem()
    .setTitle('Q2. Based on the DPE context available to you, how would you expect a case of confirmed serious franchise-store underperformance to be managed? Please briefly outline the main steps you would expect, from understanding the problem through to recovery or, where recovery is not viable, another formal decision.')
    .setRequired(true);

  // Q3 – Understanding the cause
  form.addParagraphTextItem()
    .setTitle("Q3. Before recovery actions are agreed, what information would you expect DPE to examine to understand the main causes of the store's underperformance? Please identify the two or three areas you consider most important.")
    .setRequired(true);

  // Q4 – Recovery-plan design
  // Required checkbox question with hard validation: respondent must select 1–3 choices.
  // “Not sure” is deliberately excluded because it could be selected together with substantive options,
  // which standard Google Forms cannot make mutually exclusive inside a checkbox item.
  const q4 = form.addCheckboxItem()
    .setTitle('Q4. In your opinion, what should a strong recovery plan for an underperforming franchise store include? Please select up to three elements you consider most important.')
    .setChoiceValues([
      'Corrective actions that are explicitly linked to the causes identified',
      'Clear accountability for each agreed action',
      'Time-bound milestones or deadlines',
      'Measurable criteria for what successful recovery looks like',
      'The DPE support or resources required to carry out the actions',
      'A defined review point and escalation rule if performance does not improve'
    ])
    .showOtherOption(true)
    .setRequired(true);

  q4.setValidation(
    FormApp.createCheckboxValidation()
      .setHelpText('Please select between 1 and 3 options.')
      .requireSelectAtLeast(1)
      .requireSelectAtMost(3)
      .build()
  );

  // Q5 – Most vulnerable H3 stage
  // Single choice: only one stage/response can be selected.
  form.addMultipleChoiceItem()
    .setTitle('Q5. If inconsistency or breakdown were occurring within the recovery process, at which stage would you investigate first?')
    .setChoiceValues([
      'Diagnosing the main causes of underperformance',
      'Translating the diagnosis into a clear recovery plan',
      'Executing the agreed recovery actions and mobilising support',
      'Monitoring progress and deciding whether to continue, revise, escalate or close the case',
      'No single stage stands out; it would depend on the case',
      'Not enough information to judge'
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Q6. What is the main reason you selected that stage or response?')
    .setRequired(true);

  // Q7 – Immediate response at review point
  // Single choice: options are framed as mutually exclusive immediate next steps.
  form.addMultipleChoiceItem()
    .setTitle('Q7. At a planned review point, the store has not improved as expected. Which immediate management response would you consider most appropriate?')
    .setChoiceValues([
      'Continue the current recovery plan unchanged for more time',
      'Reassess the evidence and causes before deciding the next action',
      'Revise the recovery actions using the current diagnosis',
      'Escalate directly to a governed alternative decision such as refranchising, transfer or closure',
      'Not enough information to decide'
    ])
    .setRequired(true);

  // Q8 – Expected outcome impact
  // Radio-button grid: exactly one response is possible per row.
  const q8 = form.addGridItem()
    .setTitle('Q8. If diagnosis, recovery-plan design, execution or follow-up are handled inconsistently between cases, how much impact would you expect this to have on each outcome below?')
    .setRows([
      'Time required to reach a governed resolution',
      'Likelihood of achieving sustainable recovery',
      'Amount of rework or repeated changes to recovery actions',
      'Risk that performance deteriorates before a clear resolution is reached'
    ])
    .setColumns([
      'No material impact',
      'Small impact',
      'Moderate impact',
      'Large impact',
      'Not sure'
    ])
    .setHelpText('Please select one response for each row.')
    .setRequired(true);

  // Q9 – Direct H3 plausibility test
  form.addScaleItem()
    .setTitle('Q9. Based on the process you have considered, how plausible do you find the following explanation?\n\n“Inconsistent diagnosis, recovery-plan design, execution or follow-up materially contributes to some cases taking longer to resolve or failing to achieve sustainable recovery.”')
    .setBounds(1, 5)
    .setLabels('Very implausible', 'Very plausible')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Q10. What is the main reason for your rating? Please mention anything that makes this explanation more or less convincing in your view.')
    .setRequired(true);

  // Q11 – Rival-hypothesis prioritisation
  // Single choice across the four MECE first-level organisational branches.
  form.addMultipleChoiceItem()
    .setTitle('Q11. If DPE could investigate only one organisational area first, which would you prioritise as the most plausible contributor to unresolved franchise-store underperformance?')
    .setChoiceValues([
      'Governance & decision rights — ownership, escalation and decision authority (H1)',
      'Performance information & detection — timeliness, reliability and shared visibility of early warning (H2)',
      'Intervention process & control — diagnosis, recovery planning, execution and follow-up (H3)',
      'Capability & capacity — skills, time, staffing and access to specialist support (H4)',
      'Not enough information to prioritise'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Q12. What is the main reason for your choice? If another area would be a close second, you may mention it briefly.')
    .setRequired(true);

  // Q13 – Closing / zinger
  form.addParagraphTextItem()
    .setTitle('Q13. If you were the senior executive accountable for this process and could make only one organisational change first, what would you change, and why?')
    .setRequired(true);

  // Q14 – Open final question
  form.addParagraphTextItem()
    .setTitle('Q14. Is there anything else about the organisational causes of franchise-store underperformance, or the way these cases are managed, that you think we should have asked about?')
    .setRequired(false);

  form.setPublished(true);

  Logger.log('FORM EDIT URL: ' + form.getEditUrl());
  Logger.log('FORM RESPONDER URL: ' + form.getPublishedUrl());
  Logger.log('RESPONSE SHEET URL: ' + responseSheet.getUrl());

  return {
    editUrl: form.getEditUrl(),
    responderUrl: form.getPublishedUrl(),
    responseSheetUrl: responseSheet.getUrl()
  };
}
