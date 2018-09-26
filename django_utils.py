def serializable_object(self):
    """
    Returns a JSON serializable object with children set
    :param self:
    :return:
    """
    obj = {
        'id': self.id,
        'text': self.name,
        'children': [],
    }
    for skill in self.children_set.all().order_by('name'):
        obj['children'].append(skill.serializable_object())
    return obj

