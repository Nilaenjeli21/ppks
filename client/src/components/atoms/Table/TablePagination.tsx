import { PRIMARY } from "@common/constant/Color";
import { Pagination, PaginationItem, Stack, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export interface TablePaginationProps {
  total?: number;
  count?: number;
  page?: number;
  onPageChange?: (value: number) => void;
}

const TablePagination = ({
  total,
  count,
  page,
  onPageChange,
}: TablePaginationProps): JSX.Element => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mt={2}
      mb={2}
      px={2}
      sx={{ backgroundColor: "#D6D4D4", my: 0, py: 1 }}
    >
      <div>
        <Typography variant="subtitle1" fontSize={13} fontWeight={600}>
          Total {total}
        </Typography>
      </div>
      {onPageChange && (
        <Pagination
          count={count}
          page={page}
          hideNextButton={count === 1}
          renderItem={(item) => (
            <PaginationItem
              components={{
                previous: KeyboardArrowLeftIcon,
                next: KeyboardArrowRightIcon,
              }}
              {...item}
            />
          )}
          onChange={(e, value) => onPageChange(value)}
          sx={{
            "& .Mui-selected": {
              fontWeight: 700,
              fontSize: "14px",
              lineHeight: "20px",
              color: PRIMARY,
              backgroundColor: "white" + "!important",
            },
          }}
        />
      )}
    </Stack>
  );
};

export default TablePagination;
