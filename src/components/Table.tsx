import React, { useEffect, useRef, useState } from "react";
import { useTable, useExpanded, Column } from "react-table";
import html2canvas from "html2canvas";

interface Break {
  startTime: string;
  endTime: string;
}

interface Session {
  subject: string;
  startTime: string;
  endTime: string;
  breaks: Break[];
  tips: string[];
}

interface Day {
  day: string;
  availableTime: string;
  sessions: Session[];
}

const Table = ({ studyPlan }: { studyPlan: any }) => {
  const [data, setData] = useState<Day[]>([]);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const getData = async () => {
      setData(studyPlan.week);
    };
    getData();
  }, [studyPlan]);

  const columns: Column<Day>[] = React.useMemo(
    () => [
      {
        Header: "Day",
        accessor: "day",
      },
      {
        Header: "Available Time",
        accessor: "availableTime",
      },
      {
        Header: "Sessions",
        accessor: "sessions",
        Cell: ({ row }) => (
          <ul className="sessioncolumn">
            {row.original.sessions.map((session, i) => (
              <li key={i} className="border-b border-desccolor py-2">
                <strong>{session.subject}</strong> ({session.startTime} -{" "}
                {session.endTime})
                <ul>
                  {session.breaks.length > 0 && (
                    <li>
                      <strong>Breaks:</strong>
                      <ul>
                        {session.breaks.map((brk, j) => (
                          <li key={j}>
                            {brk.startTime} - {brk.endTime}
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}
                  {session.tips.length > 0 && (
                    <li>
                      <strong>Tips:</strong>
                      <ul>
                        {session.tips.map((tip, k) => (
                          <li key={k}>{tip}</li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>
              </li>
            ))}
          </ul>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useExpanded);

  const handleDownloadImage = () => {
    if (tableRef.current) {
      html2canvas(tableRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "study_plan.png";
        link.click();
      });
    }
  };

  return (
    <>
      <table
        ref={tableRef}
        {...getTableProps()}
        className="text-textcolor rounded-lg"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="bg-headerbg text-textcolor p-2"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
      </table>

      <button
        onClick={handleDownloadImage}
        className="text-textcolor fixed top-24 right-20 p-2 border border-textcolor rounded-lg transition-all cursor-pointer hover:border-primary "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </button>
    </>
  );
};

export default Table;
