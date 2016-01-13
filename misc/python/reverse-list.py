# Write a function to reverse a linked list in-place

class LinkedListNode:

    def __init__(self, value):
        self.value = value
        self.next  = None


# basic idea to reverse a linked list in-place is to
# walk through the list once and change the `next` pointer
# to point to the previous node
def reverse_list(head):
    curr = head
    prev = None

    while curr != None:
        # store `next` before overwriting it
        next = curr.next

        # set `next` to previous node
        curr.next = prev

        # fix `previous` pointer so we walk to the next
        prev = curr

        # walk to the next node
        curr = next

    # `prev` is now the list head as `curr` will be `None`
    return prev


def print_list(head):
    curr = head
    while curr != None:
        print curr.value
        curr = curr.next


if __name__ == '__main__':
    # Tests
    assert(reverse_list(None) == None)
    assert(reverse_list(LinkedListNode(2)).value == 2)

    list = LinkedListNode(1)
    node2 = LinkedListNode(2)
    node3 = LinkedListNode(3)
    node4 = LinkedListNode(4)

    list.next = node2
    node2.next = node3
    node3.next = node4

    reverse = reverse_list(list)

    assert(reverse.value == 4)
    assert(reverse.next.value == 3)
    assert(reverse.next.next.value == 2)
    assert(reverse.next.next.next.value == 1)
    assert(reverse.next.next.next.next == None)

    print 'Success!'





