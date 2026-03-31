export default {
	// Function to determine the correct query based on active tab and sub-tab
	runApplyQuery() {
		// Get the active main tab and sub-tab
		const activeMainTab = main_tab.selectedTab; 
		console.log(activeMainTab)// e.g., 'Usage Logs', 'Key numbers', 'Knowledge', 'Developer'
		let activeSubTab;
		let activeSubSubTab;
		// activeSubSubTab is already defined here still getting error 

		// Check if the selected main tab is 'Usage Logs', 'Key numbers', 'Knowledge', 'Developer' to capture sub-tab selection
		if (activeMainTab === 'Usage Logs') {
			activeSubTab = usage_logs_tab.selectedTab;
			activeSubSubTab = answer_tab.selectedTab // e.g., 'Questions Answered', 'No information found'
		} else if (activeMainTab === 'Key numbers') {
			activeSubTab = key_numbers_tab.selectedTab;
		} else if (activeMainTab === 'Knowledge') {
			activeSubTab = knowledge_tab.selectedTab;  // e.g., 'Active documents', 'Connectors', 'QnA'
			// } else if (activeMainTab === 'Developer') {
			//   activeSubTab = developer_tab.selectedTab;  // e.g., 'RAG', 'RAG Search'
		} else if (activeMainTab === 'User') {
			activeSubTab = user_tab.selectedTab;
		} else if (activeMainTab === 'Account') {
			activeSubTab = account_tab.selectedTab;
		} else if (activeMainTab === 'Workflows') {
			activeSubTab = workflow_tab.selectedTab;
		}

		// Logic to run specific queries based on selected tabs
		switch (activeMainTab) {
			case 'Usage Logs':
				console.log("Licenses tab selected, running mergeLicenseData");
				return this.UsageLogsQuery(activeSubTab, activeSubSubTab); 
				// return this.UsageLogsQuery(activeSubTab);
			case 'Key numbers':
				return this.KeyNumbers(activeSubTab); 
			case 'Knowledge':
				return this.Knowledge(activeSubTab); 
			case 'User':
				return this.Users(activeSubTab);
			case 'Account':
				return this.Accounts(activeSubTab);
			case 'Workflows':
				return this.Workflows(activeSubTab);
				//   case 'Developer':
				// 	return feedback_js01.match()
			default:
				showAlert("No valid main tab selected.");
		}
	},

	// Function for queries related to 'Answer' main tab
	UsageLogsQuery(activeSubTab, activeSubSubTab) {
		switch (activeSubTab) {
			case 'Answer':
				return this.answer_query(activeSubSubTab);

			case 'Search':
				return search_qry.run();

			case 'Rewrite':
				return rewrite_qry.run();

			case 'Feedback':
				return feedback_qry.run();

			case 'AI Teammate':
				return ai_teammate_qry.run();


			case 'AI Teammate - RFP':
				return ai_teammate_rfp_qry.run();

			case 'Workflows':
				return workflow_logs_qry.run();
				//       .run()
				//       .then(() => {
				//         // Once generateAnswered_q1 query is successful, run the getUniqueIDCount
				//         getUniqueIds_demo_js01.getUniqueIDCount();
				//       })
				//       .catch((error) => {
				//         // Log the error if something goes wrong
				//         console.log("Error getting unique count:", error);
				//       });
				//   case 'Search':
				//     return search_qry.run();  // Run the query for 'No information found'
				//   case 'Rewrite':
				//     return rewrite_qry.run();  // Run the query for 'Generate count'
				//   case 'Feedback':
				//     return feedback_qry.run();  // Run the query for 'Generate count'
			default:
				showAlert("No valid sub-tab selected under 'Usage Logs'.");
		}
	},

	answer_query(activeSubSubTab) {
		switch (activeSubSubTab) {
			case 'Questions answered':
				return questions_answered_qry.run();  // Run the query for 'Question answered'
			case 'No information found':
				return no_information_found_qry.run();  // Run the query for 'Total questions'
			default:
				showAlert("No valid sub-sub-tab selected under 'Answer'.");
		}
	},

	// Function for queries related to 'Autofill' main tab
	KeyNumbers(activeSubTab) {
		switch (activeSubTab) {
			case 'Autofill':
				return Promise.all([
					autofill_stats.run(),
					autofill_total_questions_qry.run()
				])
					.then(([result1, result2]) => {
					console.log("Both queries executed successfully!");
					return { result1, result2 }; // Return both results
				})
					.catch((error) => {
					console.error("Error running queries:", error);
					return { error }; // Handle errors gracefully
				});
			case 'Generate':
				return Promise.all([
					generate_filter_stats_js.fetchData(),
					generate_qry.run()
				])
					.then(([result1, result2]) => {
					console.log("Both queries executed successfully!");
					return { result1, result2 }; // Return both results
				})
					.catch((error) => {
					console.error("Error running queries:", error);
					return { error }; // Handle errors gracefully
				});
			case 'Licenses':
				console.log("Licenses tab selected, running mergeLicenseData");

				// Ensure queries are executed before calling mergeLicenseData
				return Promise.all([total_licenses_qry.run(), active_licenses_qry.run()])
					.then(() => {
					transaction_consumed_qry.run()
					const mergedData = license_count_js.mergeLicenseData(); // Call the merge function
					storeValue("mergedLicenseData", mergedData); // Store result for widget binding
					console.log("Licenses data merged successfully!");
					return mergedData; // Return for further use
				})
					.catch((error) => {
					console.error("Error in Licenses tab processing:", error);
					showAlert("An error occurred while processing license data.", "error");
				});
				// case 'Projects Created':
				// return autofillRunCounts_q01.run();  // Run the query for 'Autofill runs'
			case 'Projects':
				return projects_count_qry.run();  // Run the query for 'Active documents'
			default:
				showAlert("No valid sub-tab selected under 'Key numbers'.");
		}
	},

	Knowledge(activeSubTab) {
		switch (activeSubTab) {
			case 'Active Documents':
				return active_documents_qry.run();  // Run the query for 'Active documents'
			case 'Connectors':
				return connectors_qry.run();  // Run the query for 'Connectors'
			case 'QnA':
				return Promise.all([
					qna_stats_qry.run(),
					qna_qry.run()
				])
					.then(([result1, result2]) => {
					console.log("Both queries executed successfully!");
					return { result1, result2 }; // Return both results
				})
					.catch((error) => {
					console.error("Error running queries:", error);
					return { error }; // Handle errors gracefully
				}); // Run the query for 'QnA'
			default:
				showAlert("No valid sub-tab selected under 'Knowledge'.");
		}
	},

	Users(activeSubTab) {
		switch (activeSubTab) {
			case 'Active Users':
				return active_users_qry.run();
			case 'Pending Invitations':
				return invite_users_invitations_qry.run();
			default:
				showAlert("No valid sub-tab selected under 'Users'.");
		}
	},

	Accounts(activeSubTab) {
		switch (activeSubTab) {
			case 'Accounts':
				return active_accounts_qry.run();
			case 'Pending Invitations':
				return invite_accounts_invitation_qry.run();
			default:
				showAlert("No valid sub-tab selected under 'Users'.");
		}
	},

	Workflows(activeSubTab) {
		switch (activeSubTab) {
			case 'Post call':
				return post_call_logs_qry.run();
			case 'Pre call':
				return pre_call_logs_qry.run();
			case 'Sales to post sales':
				return sales_to_post_sales_logs_qry.run();
			case 'SOW':
				return sow_logs_qry.run();
			default:
				showAlert("No valid sub-tab selected under 'Workflows'.");
		}
	}
	// Function for queries related to 'Debug' main tab
	//   runDebugQuery(activeSubTab) {
	//     switch (activeSubTab) {
	//       case 'RAG':
	//         return debug_rag_js01.myFun2();  // Run the query for 'RAG'
	//       case 'RAG Search':
	//         return debug_rag_search_js01.myFun2();  // Run the query for 'RAG Search'
	//       default:
	//         showAlert("No valid sub-tab selected under 'Debug'.");
	//     }
	//   }, 
};