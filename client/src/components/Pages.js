import React, { useContext } from "react";
import { Pagination } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Pages = observer(() => {
  const { device } = useContext(Context);
  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = [];

  console.log(`device.page ${device.page}`);
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination className="mt-5 custom-outline-dark" xs={4} md={4} xl={4}>
      {pages.map(page => (
        <Pagination.Item
          key={page}
          active={device.page === page}
          onClick={() => device.setPage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Pages;
