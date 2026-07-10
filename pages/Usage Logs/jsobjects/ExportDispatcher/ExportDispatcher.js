export default {
/**
 * Routes the one shared Export button to the correct per-table export,
 * based on which Usage Logs tab is currently active.
 *
 * Bind the Export button's onClick to:
 *   {{ ExportDispatcher.downloadCurrentTab() }}
 *
 * To add a new tab later:
 *   1. Build its per-table wrapper JS Object (same pattern as
 *      AITeammateExport.js), calling XLSXExportUtils.exportTableAsXLSX.
 *   2. Add one line below mapping that tab's name to its wrapper.
 * No changes needed to the button itself.
 */
  downloadCurrentTab() {
    const tab = usage_logs_tab.selectedTab; // <-- confirm this matches your Tabs widget name

    switch (tab) {
      case "AI Teammate":
        return AITeammateExport.downloadXLSX();

      case "Answer":
        // return AnswerExport.downloadXLSX();
        showAlert("Export not set up yet for the Answer tab", "warning");
        return;

      case "Rewrite":
        // return RewriteExport.downloadXLSX();
        showAlert("Export not set up yet for the Rewrite tab", "warning");
        return;

      case "Feedback":
        // return FeedbackExport.downloadXLSX();
        showAlert("Export not set up yet for the Feedback tab", "warning");
        return;

      case "Workflows":
        // return WorkflowsExport.downloadXLSX();
        showAlert("Export not set up yet for the Workflows tab", "warning");
        return;

      default:
        showAlert("Export not available for this tab", "warning");
    }
  },
};