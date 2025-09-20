export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name: </label>
            <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description" rows={10} cols={50}>
                The assignment is available online. Submit a link to the landing page of
                your Web application running on Netlify. The landing page should include:
                Your full name, Section, Links to each of the lab assignments, Link to
                the Kambaz application, Links to all relevant source code repositories.
                The Kambaz application should include a link to navigate back to the
                landing page.
            </textarea>
            <br />
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points:</label>
                    </td>
                    <td>
                        <input id="wd-points" defaultValue={100} />
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group:</label>
                    </td>
                    <td>
                        <select id="wd-group" defaultValue="ASSIGNMENTS">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECT">PROJECT</option>
                        </select>
                    </td>
                </tr>

                {/* Display Grade As */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as:</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as" defaultValue="POINTS">
                            <option value="POINTS">Points</option>
                            <option value="PERCENTAGE">Percentage</option>
                            <option value="LETTER_GRADE">Letter Grade</option>
                            <option value="COMPLETE_INCOMPLETE">Complete/Incomplete</option>
                        </select>
                    </td>
                </tr>

                {/* Submission Type */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-submission-type" defaultValue="ONLINE">
                            <option value="ONLINE">Online</option>
                            <option value="ONPAPER">On Paper</option>
                            <option value="NO_SUBMISSION">No Submission</option>
                        </select>
                    </td>
                </tr>

                {/* Online Entry Options */}
                <tr>
                    <td align="right" valign="top">
                        <label>Online Entry Options:</label>
                    </td>
                    <td>
                        <label>
                            <input id="wd-text-entry" type="checkbox" /> Text Entry
                        </label><br />
                        <label>
                            <input id="wd-website-url" type="checkbox" /> Website URL
                        </label><br />
                        <label>
                            <input id="wd-media-recordings" type="checkbox" /> Media Recordings
                        </label><br />
                        <label>
                            <input id="wd-student-annotation" type="checkbox" /> Student Annotation
                        </label><br />
                        <label>
                            <input id="wd-file-upload" type="checkbox" /> File Uploads
                        </label>
                    </td>
                </tr>

                {/* Assign To */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-assign-to">Assign to:</label>
                    </td>
                    <td>
                        <input id="wd-assign-to" defaultValue="Everyone" />
                    </td>
                </tr>

                {/* Due Date */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-due-date">Due:</label>
                    </td>
                    <td>
                        <input id="wd-due-date" type="date" />
                    </td>
                </tr>

                {/* Available From */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-available-from">Available from:</label>
                    </td>
                    <td>
                        <input id="wd-available-from" type="date" />
                    </td>
                </tr>

                {/* Available Until */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-available-until">Available until:</label>
                    </td>
                    <td>
                        <input id="wd-available-until" type="date" />
                    </td>
                </tr>
            </table>
            <br />
            {/* Buttons */}
            <button id="wd-cancel-assignment">Cancel</button>
            <button id="wd-save-assignment">Save</button>
        </div>
    );
}
